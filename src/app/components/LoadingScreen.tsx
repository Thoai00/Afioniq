"use client";

import { motion } from "framer-motion";
import { Gamepad } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Gamepad size={64} className="text-green-400 mx-auto" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
          className="h-1 bg-green-400 rounded-full"
        />
        <p className="text-gray-400 mt-4 animate-pulse">Loading Game World...</p>
      </div>
    </div>
  );
}