import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { TEAMS } from "@/lib/teams";
import { QUESTIONS } from "@/lib/questions";

const VALID_QUESTION_IDS = QUESTIONS.map((q) => q.id);
const VALID_TEAM_NAMES = TEAMS.map((t) => t.name);
const MAX_TEXT_LENGTH = 600;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const questionId = Number(searchParams.get("questionId"));

  if (!VALID_QUESTION_IDS.includes(questionId)) {
    return NextResponse.json({ error: "invalid questionId" }, { status: 400 });
  }

  try {
    const db = getDb();
    const snapshot = await db
      .collection("answers")
      .where("questionId", "==", questionId)
      .get();

    const answers = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        team: data.team,
        text: data.text,
      };
    });

    return NextResponse.json({ answers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const questionId = Number(body.questionId);
  const team = typeof body.team === "string" ? body.team.trim() : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!VALID_QUESTION_IDS.includes(questionId)) {
    return NextResponse.json({ error: "invalid questionId" }, { status: 400 });
  }
  if (!VALID_TEAM_NAMES.includes(team)) {
    return NextResponse.json({ error: "invalid team" }, { status: 400 });
  }
  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: "text too long" }, { status: 400 });
  }

  try {
    const db = getDb();
    const docRef = await db.collection("answers").add({
      questionId,
      team,
      text,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
