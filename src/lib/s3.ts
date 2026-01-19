import { S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import https from "https";

// Simplify the agent to just ignore unauthorized certificates
// The previous explicit protocol versions were conflicting
const agent = new https.Agent({
  rejectUnauthorized: false
});

function getS3Endpoint(): string | undefined {
  if (process.env.S3_ENDPOINT) return process.env.S3_ENDPOINT;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url) return `${url.replace(/\/$/, "")}/storage/v1/s3`;
  return undefined;
}

export const s3Client = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: getS3Endpoint(),
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  requestHandler: new NodeHttpHandler({
    httpsAgent: agent,
  }),
});
