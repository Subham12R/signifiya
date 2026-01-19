"use server";

import { PrismaClient } from "@prisma/client";
import { s3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// Ensure a single instance of Prisma Client in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function uploadAvatar(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    const bucketName = process.env.S3_BUCKET_NAME || "avatars";
    const endpoint =
      process.env.S3_ENDPOINT ||
      (process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "")}/storage/v1/s3`
        : "");

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);

    let publicUrl = "";
    if (endpoint && endpoint.includes("supabase.co")) {
       const baseUrl = endpoint.replace("/s3", "/object/public");
       publicUrl = `${baseUrl}/${bucketName}/${fileName}`;
    } else {
       publicUrl = `${endpoint}/${bucketName}/${fileName}`;
    }

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserProfile(
  userId: string, 
  data: {
    name?: string;
    image?: string;
    gender?: string;
    collegeName?: string;
    mobileNo?: string;
  }
) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.image && { image: data.image }),
        ...(data.gender && { gender: data.gender }),
        ...(data.collegeName && { collegeName: data.collegeName }),
        ...(data.mobileNo && { mobileNo: data.mobileNo }),
      },
    });

    return { success: true, user: updatedUser };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserProfile(userId: string) {
  try {
     if (!userId) return null;
     const user = await prisma.user.findUnique({
       where: { id: userId },
       include: {
         // @ts-ignore
         registeredEvents: true,
         // @ts-ignore
         generatedPasses: true
       }
     });
     return user;
  } catch (error) {
    console.error("Get profile error:", error);
    return null;
  }
}

export async function submitIssue(data: {
  text: string;
  email?: string;
  name?: string;
}) {
  try {
    if (!data.text || data.text.trim().length === 0) {
      return { success: false, error: "Issue text is required" };
    }

    const issue = await prisma.issue.create({
      data: {
        text: data.text.trim(),
        email: data.email?.trim() || null,
        name: data.name?.trim() || null,
      },
    });

    return { success: true, issue };
  } catch (error: any) {
    console.error("Submit issue error:", error);
    return { success: false, error: error.message };
  }
}

export async function subscribeNewsletter(data: { email: string; consent: boolean }) {
  try {
    const email = data.email?.trim();
    if (!email) {
      return { success: false, error: "Email is required" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please enter a valid email address" };
    }
    if (!data.consent) {
      return { success: false, error: "Please agree to receive communications" };
    }

    await prisma.newsletterSubscription.create({
      data: { email: email.toLowerCase(), consent: data.consent },
    });
    return { success: true };
  } catch (error: any) {
    if (error?.code === "P2002") {
      return { success: false, error: "This email is already subscribed" };
    }
    console.error("Subscribe newsletter error:", error);
    return { success: false, error: error?.message || "Something went wrong" };
  }
}
