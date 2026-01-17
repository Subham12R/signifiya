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

// --- VALIDATION SCHEMA (Unchanged) ---
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

  // Neo-Brutalist Input Styles helper
  const inputStyles =
    "rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all outline-none";
  const labelStyles =
    "text-black font-bold uppercase text-xs tracking-wider mb-1 block";

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center p-4 lg:p-8 font-sans overflow-x-hidden">
      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] w-full  border-4 border-black shadow-[12px_12px_0px_0px_rgba(20,20,20,1)] overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
        {/* --- LEFT SIDE: FORM --- */}
        <div className="flex-1 flex flex-col p-6 lg:p-10 relative">
          {/* Header */}
          <div className="flex flex-col mb-8">
            <Link
              href="/"
              className="inline-block w-fit text-black font-mono text-xs font-bold border-2 border-black px-3 py-1 rounded bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all mb-6"
            >
              ← RETURN HOME
            </Link>

            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-black leading-none uppercase">
              Visitor <br />{" "}
              <span className="text-purple-600">Registration.</span>
            </h1>

            {/* Retro Progress Bar */}
            <div className="mt-8 w-full h-6 border-2 border-black rounded-full p-1 bg-zinc-100">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                }}
                className="h-full bg-black rounded-full transition-all duration-500 ease-in-out relative"
              >
                {/* Striped Pattern Overlay */}
                <div
                  className="absolute inset-0 w-full h-full opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)",
                  }}
                ></div>
              </motion.div>
            </div>
            <div className="flex justify-between mt-2 font-mono text-xs font-bold">
              <span>DETAILS</span>
              <span>PAYMENT</span>
              <span>DONE</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* --- STEP 1: DETAILS --- */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="bg-blue-100 border-2 border-black p-4 rounded-xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-bold text-sm">
                    👋 HEY THERE! FILL IN YOUR DETAILS TO GET STARTED.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <Label className={labelStyles}>First Name</Label>
                      <Input
                        {...register("firstName")}
                        className={inputStyles}
                        placeholder="JOHN"
                      />
                      {errors.firstName && (
                        <p className="text-red-600 font-bold text-xs mt-1 bg-red-100 inline-block px-1 border border-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <Label className={labelStyles}>Last Name</Label>
                      <Input
                        {...register("lastName")}
                        className={inputStyles}
                        placeholder="DOE"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className={labelStyles}>Email Address</Label>
                      <Input
                        {...register("email")}
                        type="email"
                        className={inputStyles}
                        placeholder="JOHN@EXAMPLE.COM"
                      />
                    </div>
                    <div>
                      <Label className={labelStyles}>Phone Number</Label>
                      <Input
                        {...register("phone")}
                        className={inputStyles}
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className={labelStyles}>College Name</Label>
                    <Input
                      {...register("college")}
                      className={inputStyles}
                      placeholder="INSTITUTE OF TECHNOLOGY"
                    />
                  </div>

                  <div>
                    <Label className={labelStyles}>Address</Label>
                    <Input
                      {...register("address")}
                      className={inputStyles}
                      placeholder="STREET, AREA"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                      <Label className={labelStyles}>City</Label>
                      <Input
                        {...register("city")}
                        className={inputStyles}
                        placeholder="CITY"
                      />
                    </div>

                    <div className="w-full flex gap-4 flex-1">
                      <div className="flex-1">
                        <Label className={labelStyles}>State</Label>
                        <Select onValueChange={(v) => setValue("state", v)}>
                          <SelectTrigger className={inputStyles}>
                            <SelectValue placeholder="SELECT" />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <SelectItem value="WB">WEST BENGAL</SelectItem>
                            <SelectItem value="OT">OTHER</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Label className={labelStyles}>Country</Label>
                        <Select onValueChange={(v) => setValue("country", v)}>
                          <SelectTrigger className={inputStyles}>
                            <SelectValue placeholder="SELECT" />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <SelectItem value="IN">INDIA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-zinc-50 p-3 rounded-lg border-2 border-dashed border-zinc-300">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(v) => setValue("agreement", v === true)}
                      className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:text-white w-5 h-5 rounded-md"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-zinc-700 font-bold text-xs cursor-pointer uppercase"
                    >
                      I accept the terms and conditions
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white font-black text-lg py-6 rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_#8b5cf6] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#8b5cf6] hover:bg-zinc-900 transition-all active:shadow-none"
                  >
                    CONTINUE TO PAYMENT →
                  </Button>
                </form>
              </motion.div>
            )}

            {/* --- STEP 2: PAYMENT --- */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <button
                  onClick={() => setStep(1)}
                  className="text-zinc-500 font-bold text-xs uppercase hover:text-black mb-4 flex items-center gap-1"
                >
                  ← Edit Details
                </button>

                <div className="bg-zinc-100 border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden mb-8">
                  {/* Ticket "Punch" Holes */}
                  <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white border-2 border-black rounded-full"></div>
                  <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white border-2 border-black rounded-full"></div>

                  <div className="flex flex-col items-center">
                    <h2 className="font-black text-2xl uppercase tracking-tighter mb-4">
                      Scan to Pay
                    </h2>
                    <div className="bg-white p-3 border-2 border-black rounded-xl">
                      <Image
                        src="/qr.svg"
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-4 flex justify-between w-full border-t-2 border-dashed border-black pt-4 font-mono font-bold">
                      <span className="text-blue-600">AMT: ₹499.00</span>
                      <span className="text-red-600 animate-pulse">
                        EXP: {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative border-4 border-dashed border-black bg-zinc-50 p-8 rounded-2xl text-center hover:bg-white transition-colors cursor-pointer group">
                    <Dropzone
                      accept={{ "image/*": [] }}
                      onDrop={handleDrop}
                      src={files}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                          📸
                        </span>
                        <p className="font-bold text-sm uppercase">
                          Drop Screenshot Here
                        </p>
                        <p className="text-xs text-zinc-500 font-mono mt-1">
                          OR CLICK TO UPLOAD
                        </p>
                      </div>
                      <DropzoneContent />
                    </Dropzone>
                  </div>

                  <Button
                    className="w-full bg-green-500 text-black font-black text-lg py-6 rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-400 transition-all active:shadow-none"
                    disabled={isLoading}
                    onClick={handleConfirmRegister}
                  >
                    {isLoading ? "PROCESSING..." : "CONFIRM & REGISTER ✓"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* --- STEP 3: SUCCESS --- */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col items-center justify-center text-center h-full"
              >
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50"></div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="relative w-28 h-28 bg-green-400 border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="text-5xl">🎉</span>
                  </motion.div>
                </div>

                <h2 className="text-5xl font-black text-black tracking-tighter mb-4 uppercase">
                  You're In!
                </h2>

                <div className="bg-yellow-100 border-2 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 mb-8 max-w-sm">
                  <p className="font-bold text-black text-lg">
                    Registration Complete.
                  </p>
                  <p className="text-sm font-mono mt-2 border-t border-black pt-2">
                    Check your email for the pass. See you at Signifiya 2K26!
                  </p>
                </div>

                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-black text-white font-bold px-8 py-4 rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  RETURN TO HOME ⏎
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- RIGHT SIDE: VISUAL --- */}
        <div className="hidden lg:flex flex-1 bg-purple-100 relative items-center justify-center border-l-4 border-black p-8">
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-400 border-2 border-black rounded-full flex items-center justify-center font-black text-2xl animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
            ★
          </div>

          {/* Image Frame */}
          <div className="relative w-[400px] h-[500px] bg-white p-4 border-4 border-black rounded-xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-[85%] border-2 border-black rounded bg-zinc-800 overflow-hidden">
              <Image
                src="/portal.jpg"
                alt="Registration Visual"
                fill
                className="object-cover opacity-90 hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="h-[15%] flex items-center justify-between px-2 pt-2">
              <span className="font-black text-xl tracking-tighter">
                SIGNIFIYA'26
              </span>
              <span className="font-mono text-xs bg-black text-white px-2 py-1 rounded">
                EST. 2021
              </span>
            </div>
            {/* Tape Effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-red-500/80 rotate-1 border-l-2 border-r-2 border-transparent opacity-80 backdrop-blur-sm"></div>
          </div>

          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
