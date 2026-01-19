"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. DATA CONFIGURATION ---

// Categories from your uploaded image
const teamCategories = [
  "ALL",
  "CORE",
  "EXECUTION",
  "FINANCE",
  "DESIGN & MEDIA",
  "BRANDING",
  "DECORATION",
  "CROWD MGMT",
  "ESPORTS",
  "DOCUMENTATION",
];

// About Data from your uploaded image
const aboutCards = [
  {
    title: "ABOUT SIGNIFIYA'26",
    text: "Signifiya is not just an event; it's an experience. We bring together the brightest minds, the boldest creators, and the most passionate individuals for a celebration of innovation, art, and culture.",
    icon: "☺",
    color: "bg-pink-200", // Light pink background
    sticker: "EXPERIENCE",
    rotate: "-rotate-1",
  },
  {
    title: "ABOUT SOET",
    text: "The School of Engineering and Technology stands as a beacon of technical excellence, fostering innovation and shaping the future engineers who will build tomorrow's world.",
    icon: "★",
    color: "bg-blue-200", // Light blue background
    sticker: "INNOVATION",
    rotate: "rotate-1",
  },
];

// Mock Team Members (Mapped to categories)
const teamMembers = [
  {
    id: 1,
    name: "Arjun Das",
    role: "Convener",
    category: "CORE",
    image: "/team1.jpg",
    color: "bg-purple-200",
  },
  {
    id: 2,
    name: "Priya Roy",
    role: "Head of Operations",
    category: "EXECUTION",
    image: "/team2.jpg",
    color: "bg-orange-200",
  },
  {
    id: 3,
    name: "Sneha Gupta",
    role: "Finance Head",
    category: "FINANCE",
    image: "/team3.jpg",
    color: "bg-green-200",
  },
  {
    id: 4,
    name: "Rahul Sen",
    role: "Creative Lead",
    category: "DESIGN & MEDIA",
    image: "/team4.jpg",
    color: "bg-pink-200",
  },
  {
    id: 5,
    name: "Ananya Biz",
    role: "Social Media Lead",
    category: "BRANDING",
    image: "/team5.jpg",
    color: "bg-yellow-200",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Lead Decorator",
    category: "DECORATION",
    image: "/team6.jpg",
    color: "bg-teal-200",
  },
  {
    id: 7,
    name: "Rohit Kumar",
    role: "Security Head",
    category: "CROWD MGMT",
    image: "/team7.jpg",
    color: "bg-red-200",
  },
  {
    id: 8,
    name: "Ishita M.",
    role: "Tournament Admin",
    category: "ESPORTS",
    image: "/team8.jpg",
    color: "bg-indigo-200",
  },
  {
    id: 9,
    name: "Sameer K.",
    role: "Videography Head",
    category: "DOCUMENTATION",
    image: "/team9.jpg",
    color: "bg-zinc-200",
  },
  {
    id: 10,
    name: "Riya Sharma",
    role: "General Secretary",
    category: "CORE",
    image: "/team10.jpg",
    color: "bg-purple-300",
  },
];

// --- 2. COMPONENTS ---

const Marquee = () => (
  <div className="w-full relative z-20 py-10 overflow-hidden">
    <div className="absolute inset-0 flex items-center bg-yellow-300 border-y-4 border-black transform -rotate-1 scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="text-3xl font-black mx-4 tracking-tighter uppercase"
          >
            ★ MEET THE MAKERS ★ THE DREAM TEAM ★ SOET PRIDE ★
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter Logic
  const filteredMembers =
    activeFilter === "ALL"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeFilter);

  return (
    <div className="bg-zinc-950 min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <div className="p-4 lg:p-6">
        <div className="bg-gradient-to-b from-purple-950 via-purple-600 to-purple-100 min-h-[60vh] lg:min-h-[70vh] w-full rounded-[2.5rem] flex flex-col justify-center items-center relative overflow-hidden">
          <div className="z-10 flex flex-col items-center px-4">
            {/* Sticker */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-yellow-500 text-black px-6 py-2 font-mono font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2 text-sm lg:text-base uppercase mb-6"
            >
              EST. 2021
            </motion.div>

            <h1 className="text-[15vw] lg:text-[12vw] font-bold tracking-tighter text-white leading-none text-center select-none drop-shadow-xl">
              OUR TEAM
            </h1>

            <div className="mt-8 flex flex-col items-center">
              <span className="bg-white text-black px-6 py-2 font-mono font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2 text-sm lg:text-base uppercase">
                BEHIND_THE_SCENES.EXE
              </span>
            </div>
          </div>
        </div>
      </div>

      <Marquee />

      {/* --- ABOUT SECTION (From Image 1) --- */}
      <div className="w-full max-w-[98%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 px-2 lg:px-6">
        {aboutCards.map((card, idx) => (
          <div
            key={idx}
            className={`
                relative p-8 lg:p-12 rounded-[2.5rem] border-4 border-black 
                shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]
                transition-all duration-300 ${card.color} ${card.rotate} hover:rotate-0 hover:scale-[1.01]
            `}
          >
            {/* Corner Sticker */}
            <div className="absolute top-6 right-6 bg-black text-white px-3 py-1 rounded-full font-bold text-xs border-2 border-white shadow-md">
              {card.sticker}
            </div>

            <div className="flex justify-between items-start mb-6">
              <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase leading-none text-black">
                {card.title}
              </h2>
              <div className="hidden sm:flex w-14 h-14 bg-black rounded-full items-center justify-center text-yellow-400 text-3xl border-4 border-white shadow-lg">
                {card.icon}
              </div>
            </div>

            <p className="text-lg lg:text-xl font-bold leading-relaxed text-zinc-900">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      {/* --- FILTER BAR --- */}
      <div className="sticky top-4 z-30 mb-12 px-2">
        <div className="bg-white/90 backdrop-blur-md border-4 border-black rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] max-w-[98%] mx-auto overflow-x-auto custom-scrollbar">
          <div className="flex whitespace-nowrap gap-3 min-w-max">
            {teamCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`
                  px-6 py-2 font-black text-sm lg:text-base border-2 border-black rounded-lg transition-all duration-200 uppercase
                  ${
                    activeFilter === cat
                      ? "bg-purple-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]"
                      : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:bg-zinc-50"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- TEAM GRID (No Outer Border/Shadow) --- */}
      <div className="w-full max-w-[98%] mx-auto px-2 lg:px-6 pb-20">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          >
            {filteredMembers.map((member) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={member.id}
                className="relative group h-full"
              >
                {/* Profile Card */}
                <div
                  className={`
                        relative h-full w-full bg-white p-3 border-4 border-black rounded-2xl 
                        shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)]
                        transition-all duration-300 group-hover:-translate-y-2 flex flex-col
                    `}
                >
                  {/* Image Area */}
                  <div
                    className={`relative w-full aspect-[4/5] border-4 border-black rounded-xl overflow-hidden mb-3 ${member.color}`}
                  >
                    {/* Placeholder Icon if image fails */}
                    <div className="absolute inset-0 flex items-center justify-center text-black/10 font-black text-6xl select-none">
                      ☺
                    </div>

                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded border border-white">
                      {member.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-black text-xl tracking-tighter text-black uppercase leading-none mb-1">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
                      {member.role}
                    </p>

                    {/* Social Buttons */}
                    <div className="mt-auto flex gap-2">
                      <button className="flex-1 bg-black text-white py-2 rounded border-2 border-black font-bold text-[10px] uppercase hover:bg-purple-600 transition-colors">
                        LINKEDIN
                      </button>
                      <button className="w-8 flex items-center justify-center bg-white border-2 border-black rounded font-bold hover:bg-zinc-100">
                        ↗
                      </button>
                    </div>
                  </div>

                  {/* Decorative Pin */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 border-2 border-black rounded-full shadow-sm z-20 group-hover:bg-red-400 transition-colors"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="w-full py-20 text-center text-white">
            <h2 className="text-4xl font-black uppercase opacity-50">
              Coming Soon...
            </h2>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        /* Custom Scrollbar for Filters */
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
