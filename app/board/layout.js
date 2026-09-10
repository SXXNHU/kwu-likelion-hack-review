"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function BoardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/images/board-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-neutral-900/75" />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ y: "-120%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ duration: 0.7, ease: [0.62, 0, 0.35, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
