import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white overflow-hidden">
      <Navbar />
      
      {/* 🔵 Floating blobs background */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-500 opacity-30 rounded-full filter blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, 100, -50, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-cyan-500 opacity-30 rounded-full filter blur-3xl top-40 left-60"
        animate={{ x: [0, -120, 60, 0], y: [0, -80, 80, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌟 Hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-bold leading-tight drop-shadow-xl"
        >
          🚨 Disaster Relief Resource Locator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg sm:text-xl max-w-xl mt-6 text-indigo-200"
        >
          Quickly find nearby shelters, aid centers, and help points in real-time during any disaster or emergency.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-10 bg-white/10 text-white backdrop-blur-md px-8 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition shadow-lg font-semibold"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}
