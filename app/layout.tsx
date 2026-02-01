import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
    title: "痩せ色診断 | 五色ダイエット",
    description: "30秒でAI判定！あなたの痩せない原因を暴く。東洋医学の自己診断ツール。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${notoSansJP.variable} font-sans antialiased bg-white text-gray-900`}>
                <div className="min-h-screen flex flex-col items-center max-w-md mx-auto bg-white shadow-xl overflow-hidden relative border-x border-gray-100">
                    {children}
                </div>
            </body>
        </html>
    );
}
