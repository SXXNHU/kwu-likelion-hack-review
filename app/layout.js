import { Noto_Sans_KR, Gaegu } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin", "korean"],
  weight: ["400", "500", "700", "900"],
});

const gaegu = Gaegu({
  variable: "--font-handwriting",
  subsets: ["latin", "korean"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "ANIMAL LEAGUE 회고 세션",
  description: "멋쟁이사자처럼 중앙해커톤 회고 세션",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${gaegu.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
