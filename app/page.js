"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const [sleeping, setSleeping] = useState(false);

  function handleStart() {
    if (sleeping) return;
    setSleeping(true);
    setTimeout(() => {
      router.push("/board/1");
    }, 1100);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#e77c1f]">
      <motion.div
        animate={{ scale: sleeping ? 1.08 : 1, filter: sleeping ? "blur(6px)" : "blur(0px)" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/onboarding-bg.png"
          alt="Animal League"
          fill
          priority
          className="object-cover object-left"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: sleeping ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />

      <Link
        href="/write"
        className="absolute top-6 right-6 z-10 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30 transition-colors"
      >
        + 추가하기
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleStart}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: sleeping ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white text-[#a3411a] font-black text-lg sm:text-xl px-10 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.35)] tracking-wide"
        >
          시작하기
        </motion.button>
      </div>
    </div>
  );
}
