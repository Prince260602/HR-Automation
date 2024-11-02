"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background.jsx";
import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Empower Your Future with TEN
          <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-gray-300 bg-clip-text text-transparent">
            One step at a Time
          </h1>
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Your Learning, Simplified. All Insights in One Click.
        </div>
        <Link
          to="/Courses"
          className=" flex  items-center gap-2 bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        >
          Courses
          <HiArrowUpRight className="hover:size-5 transition-transform duration-300 " />
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
