"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

// Questions Data based on Master Specification
// Shortened from 30 to 15 (3 killer questions per type)
const questions = [
    // --- A. Liver (Blue) - Focus: Irritability, Eyes, Tension ---
    { id: "liver_3", category: "liver", text: "最近、イライラして\n怒りっぽい" },
    { id: "liver_6", category: "liver", text: "目が疲れる、\nまたは視力が落ちた気がする" },
    { id: "liver_2", category: "liver", text: "春になると\n体調を崩しやすい" },

    // --- B. Heart (Red) - Focus: Sweat/Heat, Sleep, Anxiety ---
    { id: "heart_7", category: "heart", text: "動悸がする、\nまたは血圧が高め" },
    { id: "heart_8", category: "heart", text: "夢をよく見る、\nまたは眠りが浅い" },
    { id: "heart_4", category: "heart", text: "顔がすぐに赤くなる、\nまたは汗っかきだ" },

    // --- C. Spleen (Yellow) - Focus: Sweet Cravings, Digestion, Worry ---
    { id: "spleen_3", category: "spleen", text: "甘いものが\n無性に食べたくなる" },
    { id: "spleen_6", category: "spleen", text: "食後すぐに\n眠くなってしまう" },
    { id: "spleen_7", category: "spleen", text: "胃がもたれる、\nまたは食欲にムラがある" },

    // --- D. Lung (White) - Focus: Skin, Pessimism, Respiratory ---
    { id: "lung_6", category: "lung", text: "肌が乾燥してかゆい、\nまたはアレルギーがある" },
    { id: "lung_4", category: "lung", text: "のどが乾燥しやすい、\nまたは咳が出る" },
    { id: "lung_2", category: "lung", text: "悲観的になりやすく、\nくよくよ悩みやすい" },

    // --- E. Kidney (Black) - Focus: Cold, Aging signs, Fear ---
    { id: "kidney_1", category: "kidney", text: "手足や腰が冷えやすい\n（冷え性）" },
    { id: "kidney_7", category: "kidney", text: "トイレが近い、\nまたは夜中にトイレに起きる" },
    { id: "kidney_4", category: "kidney", text: "白髪や抜け毛が\n急に気になり始めた" },
];

export default function DiagnosisPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, boolean>>({});

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleChoice = (choice: boolean) => {
        const newAnswers = { ...answers, [currentQuestion.id]: choice };
        setAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 150); // Slight delay for animation
        } else {
            // Finished
            localStorage.setItem("diagnosis_answers", JSON.stringify(newAnswers));
            router.push("/result"); // Go to Result (Opt-in Gate will be there)
        }
    };

    // --- ENGAGEMENT LOGIC 1: Chameleon Background ---
    const bgColors: Record<string, string> = {
        liver: "bg-blue-50 transition-colors duration-1000",
        heart: "bg-red-50 transition-colors duration-1000",
        spleen: "bg-yellow-50 transition-colors duration-1000",
        lung: "bg-slate-50 transition-colors duration-1000",
        kidney: "bg-gray-100 transition-colors duration-1000",
    };
    const currentBg = bgColors[currentQuestion.category] || "bg-gray-50";

    // --- ENGAGEMENT LOGIC 2: AI Reality Comments ---
    const getAIComment = (idx: number, total: number) => {
        const p = (idx / total) * 100;
        if (p < 20) return "まずは、基本体質をスキャン中...";
        if (p < 40) return "おや、少し気になる傾向が...";
        if (p < 60) return "内臓からのSOSを検知しています";
        if (p < 80) return "太り癖の「真犯人」が見えてきました";
        return "最終解析を実行します！";
    };

    return (
        <div className={cn("flex flex-col w-full min-h-screen items-center p-6 transition-colors duration-1000 ease-in-out", currentBg)}>

            {/* AI Status Indicator */}
            <div className="w-full max-w-sm mb-2 flex items-center justify-center space-x-2 animate-pulse">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                </span>
                <p className="text-xs font-bold text-gray-500 tracking-wider">
                    AI分析中: <span className="text-brand-black">{getAIComment(currentIndex, questions.length)}</span>
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-sm mb-8 space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span>Q.{currentIndex + 1}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/50" />
            </div>

            {/* Question Card */}
            <div className="flex-1 w-full flex items-center justify-center max-w-md pb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <Card className="w-full border-none shadow-xl bg-white/80 backdrop-blur-md">
                            <CardContent className="p-8 flex flex-col items-center text-center min-h-[300px] justify-center space-y-8">

                                {/* Visual Category Hint (Optional) */}
                                <div className={cn(
                                    "w-3 h-3 rounded-full mb-4",
                                    currentQuestion.category === 'liver' && "bg-brand-blue",
                                    currentQuestion.category === 'heart' && "bg-brand-red",
                                    currentQuestion.category === 'spleen' && "bg-brand-deepYellow",
                                    currentQuestion.category === 'lung' && "bg-brand-silver",
                                    currentQuestion.category === 'kidney' && "bg-brand-black",
                                )} />

                                <h2 className="text-2xl font-bold leading-relaxed whitespace-pre-wrap text-gray-800">
                                    {currentQuestion.text}
                                </h2>

                                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                                    <Button
                                        // Using standard style because we removed variants dependency if it was causing issues,
                                        // keeping it simple with tailwind classes directly.
                                        className="h-32 text-lg font-bold border-2 bg-white text-gray-900 border-gray-200 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-sm rounded-xl"
                                        onClick={() => handleChoice(false)}
                                    >
                                        いいえ
                                    </Button>
                                    <Button
                                        // YES Button - Pop style
                                        className="h-32 text-lg font-bold bg-brand-yellow text-black hover:bg-brand-deepYellow shadow-md hover:scale-105 transition-all text-xl active:scale-95 rounded-xl border-b-4 border-yellow-500 active:border-b-0 active:translate-y-1"
                                        onClick={() => handleChoice(true)}
                                    >
                                        はい
                                        <Check className="ml-2 w-6 h-6" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer Navigation (Back) */}
            {currentIndex > 0 && (
                <button
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="absolute bottom-6 text-gray-400 text-sm hover:text-gray-600 underline"
                >
                    前の質問に戻る
                </button>
            )}
        </div>
    );
}
