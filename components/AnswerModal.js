"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TEAMS } from "@/lib/teams";

export default function AnswerModal({ question, onClose }) {
  const [team, setTeam] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | success | error

  if (!question) return null;

  async function handleSave() {
    if (!team || !text.trim()) {
      setStatus("error");
      return;
    }
    setStatus("saving");
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, team, text: text.trim() }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setTeam("");
      setText("");
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 900);
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    setTeam("");
    setText("");
    setStatus("idle");
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "backOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white rounded-2xl p-7 shadow-2xl"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-5 text-2xl leading-none text-neutral-400 hover:text-neutral-700"
            aria-label="닫기"
          >
            ×
          </button>

          <span className="text-xs font-bold text-orange-500 tracking-wide">
            {question.label}
          </span>
          <p className="mt-1 mb-5 text-neutral-800 font-bold leading-snug break-keep">
            {question.text}
          </p>

          <label className="block text-sm font-semibold text-neutral-600 mb-1">
            우리 팀
          </label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 mb-4 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">팀을 선택하세요</option>
            {TEAMS.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-semibold text-neutral-600 mb-1">
            답변
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            maxLength={600}
            placeholder="자유롭게 작성해주세요"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 mb-2 text-neutral-800 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <p className="text-right text-xs text-neutral-400 mb-4">{text.length}/600</p>

          {status === "error" && (
            <p className="text-sm text-red-500 mb-3">
              팀과 답변을 모두 입력해주세요.
            </p>
          )}
          {status === "success" && (
            <p className="text-sm text-green-600 mb-3">저장되었습니다!</p>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={status === "saving" || status === "success"}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {status === "saving" ? "저장 중..." : "저장하기"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
