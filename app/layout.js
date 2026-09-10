import "./globals.css";
import { CurtainProvider } from "@/components/CurtainProvider";

const SITE_URL = "https://kwu-likelion-hack-review.vercel.app";
const OG_IMAGE = "/images/onboarding-bg.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AFTER HACK — 우리의 다음을 위한 회고",
  description: "멋쟁이사자처럼 중앙해커톤 회고 세션",
  openGraph: {
    title: "AFTER HACK — 우리의 다음을 위한 회고",
    description: "멋쟁이사자처럼 중앙해커톤 회고 세션",
    url: SITE_URL,
    siteName: "AFTER HACK",
    images: [{ url: OG_IMAGE, width: 1540, height: 761 }],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <CurtainProvider>{children}</CurtainProvider>
      </body>
    </html>
  );
}
