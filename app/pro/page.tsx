import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function ProTopPage() {
    return (
        <main className="flex flex-col items-center min-h-screen bg-white relative overflow-hidden">
            {/* Pro Badge */}
            <div className="absolute top-0 left-0 w-full bg-black text-white text-center text-xs font-bold py-1 z-50">
                カウンセリング専用モード (全30問)
            </div>

            {/* Hero Section */}
            <section className="w-full relative h-[600px] flex flex-col justify-end pb-12 items-center text-center">

                {/* Background Image / Placeholder */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg-concept.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-6 max-w-md w-full space-y-6">
                    {/* Copy */}
                    <div className="space-y-2">
                        <p className="text-gray-900 font-bold bg-white/80 backdrop-blur-sm inline-block px-4 py-1 rounded-full shadow-sm text-sm border border-gray-100">
                            我慢はもう、逆効果。
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight drop-shadow-sm">
                            <span className="block text-2xl mb-1 text-gray-700">AI精密解析</span>
                            あなたの<br />
                            <span className="text-brand-red underline decoration-brand-yellow decoration-4 underline-offset-4">痩せない原因</span>を<br />
                            暴く
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 font-bold text-sm bg-white/60 p-2 rounded-lg backdrop-blur-sm">
                        内臓からのサインを読み解く「痩せ色診断」。<br />
                        あなたのタイプは5色のどれ？
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <Link href="/diagnosis/full">
                            <Button
                                className="w-full text-xl h-20 rounded-2xl bg-brand-black text-white hover:bg-gray-800 shadow-xl border-b-4 border-gray-600 active:border-b-0 active:translate-y-1 transition-all animate-bounce-slight"
                            >
                                <div className="flex flex-col items-center leading-none">
                                    <span className="text-sm font-normal text-gray-300 mb-1">準備はいいですか？</span>
                                    <span className="font-bold flex items-center">
                                        診断をスタートする
                                        <ArrowRight className="ml-2 w-6 h-6" />
                                    </span>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-4 text-center text-xs text-gray-400">
                © 五色ダイエット協会
            </footer>
        </main>
    );
}
