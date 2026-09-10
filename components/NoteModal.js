"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function NoteModal({ note, onClose }) {
  return (
    <AnimatePresence>
      {note && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 3 }}
            transition={{ duration: 0.28, ease: "backOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: note.color,
              borderTop: `10px solid ${note.edge}`,
            }}
            className="relative w-full max-w-md p-8 shadow-[8px_10px_30px_rgba(0,0,0,0.5)] rounded-[3px]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-4 text-2xl leading-none text-neutral-700/70 hover:text-neutral-900"
              aria-label="닫기"
            >
              ×
            </button>
            <span
              className="inline-block text-xs font-bold px-2 py-1 rounded-full mb-4"
              style={{ background: note.edge, color: "#fff" }}
            >
              {note.team}
            </span>
            <p className="text-lg leading-relaxed text-neutral-800 whitespace-pre-wrap break-keep">
              {note.text}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
