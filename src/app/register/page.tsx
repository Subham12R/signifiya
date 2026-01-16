"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[0-9]{10}$/, "Must be 10 digits"),
  college: z.string().min(2, "Required"),
  address: z.string().min(5, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(1, "Select state"),
  country: z.string().min(1, "Select country"),
  agreement: z.boolean().refine((val) => val === true, "Must accept terms"),
});

type FormData = z.infer<typeof formSchema>;

export default function Register() {
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600);
  const [files, setFiles] = useState<File[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { agreement: false },
  });

  const onSubmit = (data: FormData) => {
    setStep(2);
  };

  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleConfirmRegister = async () => {
    if (!files || files.length === 0) {
      alert("Please upload a payment screenshot.");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(3);
  };

  // Progress Bar Width Logic
  const progressWidth = step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%";

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="px-2 py-6 bg-white rounded-4xl h-full w-full m-6 overflow-hidden">
        <div className="flex lg:flex-row flex-col w-full h-full p-4 relative">
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Common Header */}
            <div className="p-4 flex flex-col">
              <Link
                href="/"
                className="text-zinc-400 text-sm tracking-tighter hover:text-zinc-900 transition-all duration-200"
              >
                {" < "} return to home page
              </Link>
              <h1 className="text-zinc-950 tracking-tighter font-extrabold text-4xl lg:text-6xl mb-8">
                Visitor Registration.
              </h1>

              <div className="w-full h-1 bg-zinc-100  overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: progressWidth }}
                  className="h-full bg-green-500 transition-all duration-500 ease-in-out"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-start justify-start p-4 h-full"
                >
                  <h2 className="text-4xl text-zinc-700 tracking-tighter font-semibold">
                    Please Fill in your Details.
                  </h2>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full mt-4 space-y-6"
                  >
                    {/* ... (Previous Form Fields remain exactly same) ... */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/2">
                        <Label className="text-zinc-900">First Name</Label>
                        <Input
                          {...register("firstName")}
                          className="rounded-xl"
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">
                        <Label className="text-zinc-900">Last Name</Label>
                        <Input
                          {...register("lastName")}
                          className="rounded-xl"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="w-full">
                        <Label className="text-zinc-900">Email Address</Label>
                        <Input
                          {...register("email")}
                          type="email"
                          className="rounded-xl"
                          placeholder="Email"
                        />
                      </div>
                      <div className="w-full">
                        <Label className="text-zinc-900">Phone Number</Label>
                        <Input
                          {...register("phone")}
                          className="rounded-xl"
                          placeholder="Phone"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <Label className="text-zinc-900">College Name</Label>
                      <Input
                        {...register("college")}
                        className="rounded-xl"
                        placeholder="College Name"
                      />
                    </div>

                    <div className="w-full">
                      <Label className="text-zinc-900">Address</Label>
                      <Input
                        {...register("address")}
                        className="rounded-xl"
                        placeholder="Address"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/3">
                        <Label className="text-zinc-900">City</Label>
                        <Input
                          {...register("city")}
                          className="rounded-xl"
                          placeholder="City"
                        />
                      </div>

                      <div className="w-full flex gap-4 flex-1">
                        <div className="flex-1">
                          <Label className="text-zinc-900  text-xs md:text-sm">
                            State
                          </Label>
                          <Select onValueChange={(v) => setValue("state", v)}>
                            <SelectTrigger className="rounded-xl border-zinc-300 text-zinc-900">
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="WB">West Bengal</SelectItem>
                              <SelectItem value="OT">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1">
                          <Label className="text-zinc-900  text-xs md:text-sm">
                            Country
                          </Label>
                          <Select onValueChange={(v) => setValue("country", v)}>
                            <SelectTrigger className="rounded-xl border-zinc-300 text-zinc-900">
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IN">India</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        onCheckedChange={(v) =>
                          setValue("agreement", v === true)
                        }
                        className="rounded-md border-zinc-300 text-zinc-900"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-zinc-600 text-sm cursor-pointer"
                      >
                        I accept the terms and conditions
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="mt-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white py-6 rounded-xl"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-start justify-start p-4 h-full"
                >
                  <button
                    onClick={() => setStep(1)}
                    className="text-zinc-400 text-sm hover:text-zinc-950 mb-2"
                  >
                    {" < "} Edit Details
                  </button>
                  <h1 className="text-zinc-950 tracking-tighter font-extrabold text-4xl mb-2">
                    Payment.
                  </h1>
                  <p className="text-zinc-500 mb-8 tracking-tight text-lg w-full">
                    Scan QR to verify registration
                  </p>

                  <div className="p-2 flex justify-center items-center mb-4 w-full bg-zinc-100 rounded-2xl border shadow-inner">
                    <div className="w-64 h-64 bg-white border-2 border-zinc-200 flex items-center justify-center rounded-2xl relative overflow-hidden">
                      <Image
                        src="/qr.svg"
                        alt="QR Code"
                        width={250}
                        height={250}
                        className="object-contain p-4"
                      />
                    </div>
                  </div>

                  <div className="font-medium text-lg tracking-tighter mb-8 flex items-end w-full justify-between px-2">
                    <div className="text-blue-500 font-bold">Amount: ₹499</div>
                    <div className="text-red-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                      Expires: {formatTime(timeLeft)}
                    </div>
                  </div>

                  <div className="w-full space-y-4 px-2">
                    <div className="relative border-2 border-dashed border-zinc-300 p-8 rounded-2xl text-center hover:bg-zinc-50 transition-colors">
                      <Dropzone
                        accept={{ "image/*": [] }}
                        onDrop={handleDrop}
                        src={files}
                      >
                        <DropzoneEmptyState />
                        <DropzoneContent />
                      </Dropzone>
                    </div>
                    <Button
                      className="w-full py-6 rounded-xl text-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-all active:scale-[0.98]"
                      disabled={isLoading}
                      onClick={handleConfirmRegister}
                    >
                      {isLoading ? "Processing..." : "Confirm & Register"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center justify-center p-8 h-full text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
                  >
                    <svg
                      className="w-12 h-12 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h2 className="text-5xl font-extrabold text-zinc-900 tracking-tighter mb-4">
                    All Set!
                  </h2>
                  <div className="space-y-4 text-zinc-600 text-lg tracking-tight px-4">
                    <p>Your registration is complete.</p>
                    <p>
                      Your visiting pass will be sent to your registered email{" "}
                      <br className="hidden md:block" /> within the next 24
                      hours.
                    </p>
                    <p className="font-semibold text-zinc-900 pt-6 border-t border-zinc-100">
                      See you at Signifiya 2K26!
                    </p>
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="mt-12 bg-zinc-900 hover:bg-zinc-800 text-white px-10 py-6 cursor-pointer rounded-xl text-lg shadow-lg hover:shadow-zinc-200"
                  >
                    Return to Home
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex flex-1 items-center shadow-lg justify-center bg-black rounded-3xl min-h-[90vh] w-full mt-6 lg:mt-0 overflow-hidden relative">
            <Image
              src="/portal.jpg"
              alt="Registration Visual"
              fill
              className="object-cover rounded-3xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white z-10">
              <p className="text-sm font-mono opacity-60">Signifiya 2K26</p>
              <h3 className="text-2xl font-bold tracking-tighter">
                Experience Innovation.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
