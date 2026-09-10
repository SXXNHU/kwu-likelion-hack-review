"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Brand from "@/components/Brand";
import { useCurtain } from "@/components/CurtainProvider";

export default function OnboardingPage() {
  const router = useRouter();
  const { runTransition } = useCurtain();

  function handleStart() {
    runTransition(() => router.push("/board/1"));
  }

  return (
    <section className="intro">
      <header className="topbar">
        <Brand />
        <Link href="/write" className="outline">
          ＋ 추가하기
        </Link>
      </header>

      <main className="intro-main">
        <div className="eyebrow">THE HACKATHON IS OVER. OUR STORY ISN&rsquo;T.</div>
        <h1>
          끝난 줄 알았지?
          <br />
          <em>우리의 다음</em>은 지금부터.
        </h1>
        <div className="hand">잠깐, 그때의 우리로 돌아가 볼까요?</div>
        <div>
          <button type="button" className="pill" onClick={handleStart}>
            시작하기 <span>→</span>
          </button>
        </div>
        <div className="floating-note one">
          그때는
          <br />
          진짜 막막했는데…
        </div>
        <div className="floating-note two">
          돌아보니,
          <br />
          우리 꽤 자랐네!
        </div>
      </main>

      <footer className="intro-bottom">
        <strong>중앙해커톤, 그 다음 이야기</strong>
        <span>4개의 팀 &nbsp; / &nbsp; 4개의 질문 &nbsp; / &nbsp; 함께 쓰는 회고</span>
      </footer>
    </section>
  );
}
