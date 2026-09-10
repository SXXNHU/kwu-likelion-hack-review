"use client";

import StickyNote from "./StickyNote";

export default function Blackboard({ question, notes, onNoteClick }) {
  return (
    <div className="relative w-[94vw] max-w-5xl aspect-[16/10] mx-auto">
      {/* wooden frame */}
      <div
        className="absolute inset-0 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        style={{
          background: "linear-gradient(155deg, #8a5a34, #6b4023 55%, #543018)",
          padding: "1.1rem",
        }}
      >
        {/* chalkboard surface */}
        <div
          className="relative w-full h-full rounded-md overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #2d4a3a 0%, #1f3a2c 55%, #16291f 100%)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          <div className="absolute top-4 left-0 right-0 px-6 sm:px-10 text-center">
            <span className="inline-block text-white/40 text-xs sm:text-sm tracking-[0.3em] font-bold mb-1">
              {question.label}
            </span>
            <h1 className="font-handwriting text-white text-xl sm:text-3xl leading-snug break-keep drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              {question.text}
            </h1>
          </div>

          {notes.map((note, i) => (
            <StickyNote key={note.id} note={note} index={i} onClick={onNoteClick} />
          ))}

          {notes.length === 0 && (
            <p className="absolute inset-0 flex items-center justify-center text-white/30 font-handwriting text-2xl">
              아직 등록된 답변이 없어요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
