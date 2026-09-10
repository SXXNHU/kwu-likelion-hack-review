import "./globals.css";
import { CurtainProvider } from "@/components/CurtainProvider";

export const metadata = {
  title: "AFTER HACK — 우리의 다음을 위한 회고",
  description: "멋쟁이사자처럼 중앙해커톤 회고 세션",
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
