import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center w-full min-h-screen p-6 relative bg-white">
            {/* Background Geometric Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />

            {/* Hero Content */}
            <div className="z-10 w-full flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Hero Image */}
                <div className="relative w-full aspect-square max-w-[300px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                        src="/slimming-color-diagnosis/images/ito-azusa.jpg"
                        alt="ハンバーガーを持って微笑む伊藤あずさ"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Catchphrase */}
                <div className="space-y-4">
                    <div className="inline-block px-4 py-1.5 bg-brand-yellow text-black font-bold text-sm rounded-full shadow-sm animate-pulse-fast">
                        ⚠️ 動画を見る前に、必ずご確認ください
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-black">
                        ウェビナー視聴の前に、<br />
                        あなたの<span className="text-brand-red underline decoration-brand-yellow decoration-4 underline-offset-4">太り癖タイプ</span>を特定してください
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto font-bold leading-relaxed">
                        自分のタイプを知らずに見ても、効果は半減します。<br />
                        AI解析で<span className="bg-brand-yellow/30 px-1 rounded">あなた専用の視聴コース</span>を判定します。
                    </p>
                </div>

                {/* CTA Button */}
                <Link
                    href="/diagnosis"
                    className="group w-full max-w-xs"
                >
                    <div className="relative w-full bg-brand-black text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 text-center">
                        <span className="text-sm block">まずは30秒で</span>
                        <span className="ml-2 text-xl">タイプ判定する</span>
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />

                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-3 h-3 bg-brand-yellow rounded-bl-lg" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-brand-red rounded-tr-lg" />
                    </div>
                </Link>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 text-xs text-gray-400">
                © 五色ダイエット協会
            </footer>
        </main>
    );
}
