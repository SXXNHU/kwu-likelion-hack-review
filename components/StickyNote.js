"use client";

import { motion } from "framer-motion";

export default function StickyNote({ note, onClick, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick(note)}
      initial={{ opacity: 0, scale: 0.4, rotate: note.rotate }}
      animate={{ opacity: 1, scale: 1, rotate: note.rotate }}
      transition={{
        delay: 0.5 + Math.min(index * 0.035, 1.2),
        duration: 0.35,
        ease: "backOut",
      }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
      style={{
        position: "absolute",
        top: `${note.top}%`,
        left: `${note.left}%`,
        transform: "translate(-50%, -50%)",
        background: note.color,
        borderTop: `6px solid ${note.edge}`,
      }}
      className="w-28 h-28 sm:w-32 sm:h-32 p-3 shadow-[3px_5px_10px_rgba(0,0,0,0.45)] text-left flex flex-col gap-1 cursor-pointer rounded-[2px]"
    >
      <span
        className="text-[10px] font-bold tracking-tight opacity-70"
        style={{ color: note.edge }}
      >
        {note.team}
      </span>
      <span className="text-[11px] leading-snug text-neutral-800 line-clamp-4 break-keep">
        {note.text}
      </span>
    </motion.button>
  );
}
