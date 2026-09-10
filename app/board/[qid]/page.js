"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Blackboard from "@/components/Blackboard";
import NoteModal from "@/components/NoteModal";
import { getQuestion, QUESTIONS } from "@/lib/questions";
import { getTeamByName } from "@/lib/teams";
import { layoutNotes } from "@/lib/postitLayout";

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  const qid = Number(params.qid);
  const question = getQuestion(qid);

  const [answers, setAnswers] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    if (!question) return;
    let cancelled = false;

    fetch(`/api/answers?questionId=${qid}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAnswers(data.answers ?? []);
      })
      .catch(() => {
        if (!cancelled) setAnswers([]);
      });

    return () => {
      cancelled = true;
    };
  }, [qid, question]);

  if (!question) {
    router.replace("/board/1");
    return null;
  }

  const enrichedNotes = answers.map((a) => {
    const team = getTeamByName(a.team);
    return {
      id: a.id,
      team: a.team,
      text: a.text,
      color: team?.color ?? "#eee",
      edge: team?.edge ?? "#999",
    };
  });

  const notes = layoutNotes(enrichedNotes, `board-${qid}`);

  const isLast = qid >= QUESTIONS.length;
  const nextHref = isLast ? "/" : `/board/${qid + 1}`;
  const nextLabel = isLast ? "처음으로" : "다음 질문";

  return (
    <div className="relative w-full px-4">
      <Link
        href="/"
        className="fixed top-6 left-6 z-20 text-white/70 hover:text-white text-sm tracking-wide"
      >
        ← 처음으로
      </Link>

      <Blackboard question={question} notes={notes} onNoteClick={setActiveNote} />

      <Link
        href={nextHref}
        className="fixed bottom-8 right-8 z-20 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-neutral-900 font-bold px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
      >
        {nextLabel}
        <span aria-hidden>→</span>
      </Link>

      <NoteModal note={activeNote} onClose={() => setActiveNote(null)} />
    </div>
  );
}
