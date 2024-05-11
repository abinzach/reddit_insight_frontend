"use client"
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress"
import ProgressLoader from "./ui/ProgressLoader";

interface AnimatedTextProps {
  phrases: string[];
}

const BackendLoading: React.FC = () => {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Increase progress by 1 until it reaches 100
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          // Clear the interval when progress reaches 100
          clearInterval(interval);
          return 100;
        }
      });
    }, 330); // Calculate the interval based on 33 seconds and 100 steps
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div
      className="relative w-full flex justify-center items-center h-screen bg-cover"
     
    >
      <div className="relative z-10 text-center">
        <h3 className="text-xs px-10 font-medium text-black/50  md:text-sm  mb-1">
          Welcome to RedditInsight
        </h3>
        <h3 className=" font-medium text-gray-300 sm:text-lg md:text-xl lg:text-2xl mb-3 animate-pulse">
          Please wait while we spin up our servers...
        </h3>
        <div className="mt-8">
        <Progress value={progress} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default BackendLoading;
