"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { QUESTIONS } from "@/lib/questions";
import AnswerModal from "@/components/AnswerModal";

export default function WritePage() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden px-6 py-16">
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#f97316" }}
      />

      <Link
        href="/"
        className="absolute top-6 left-6 text-white/60 hover:text-white text-sm"
      >
        ← 처음으로
      </Link>

      <div className="max-w-3xl mx-auto text-center mb-12 relative">
        <p className="text-orange-400 font-bold tracking-[0.3em] text-xs mb-3">
          ANIMAL LEAGUE
        </p>
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold mb-2">
          회고 질문에 답변 남기기
        </h1>
        <p className="text-neutral-400 text-sm break-keep">
          질문 카드를 선택하고, 우리 팀과 답변을 입력해주세요.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
        {QUESTIONS.map((q, i) => (
          <motion.button
            key={q.id}
            type="button"
            onClick={() => setActiveQuestion(q)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="text-left bg-neutral-900 border border-neutral-800 hover:border-orange-500/60 rounded-2xl p-6 shadow-lg transition-colors"
          >
            <span className="inline-block text-orange-400 font-black text-lg mb-2">
              {q.label}
            </span>
            <p className="text-neutral-200 text-sm leading-relaxed break-keep">
              {q.short}
            </p>
          </motion.button>
        ))}
      </div>

      <AnswerModal question={activeQuestion} onClose={() => setActiveQuestion(null)} />
    </div>
  );
}
