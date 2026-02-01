"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// Questions Data based on Master Specification
// FULL VERSION (30 Questions) for Counseling/Pro use
const questions = [
    // --- A. Liver (Blue) ---
    { id: "liver_1", category: "liver", text: "薬やインスタント食品、お酒を\nよくとる" },
    { id: "liver_2", category: "liver", text: "春になると体調を\n崩しやすい" },
    { id: "liver_3", category: "liver", text: "最近、イライラして\n怒りっぽい" },
    { id: "liver_4", category: "liver", text: "無性に酸っぱいものが\n食べたくなる" },
    { id: "liver_5", category: "liver", text: "爪が割れやすい、\n筋が入っている" },
    { id: "liver_6", category: "liver", text: "まぶたがピクピク痙攣する、\n目が疲れる" },
    { id: "liver_7", category: "liver", text: "足がつりやすい" },
    { id: "liver_8", category: "liver", text: "決まった時間に目が覚める\n（夜中の1時〜3時）" },

    // --- B. Heart (Red) ---
    { id: "heart_1", category: "heart", text: "毎年、夏バテをする" },
    { id: "heart_2", category: "heart", text: "笑い上戸で、声が大きいと\n言われる" },
    { id: "heart_3", category: "heart", text: "コーヒーなど苦いものが好き" },
    { id: "heart_4", category: "heart", text: "顔がすぐに赤くなる" },
    { id: "heart_5", category: "heart", text: "舌をよく噛む、\n口内炎ができる" },
    { id: "heart_6", category: "heart", text: "夕方になると足がむくむ" },
    { id: "heart_7", category: "heart", text: "血圧が高め、\nまたは動悸が気になる" },
    { id: "heart_8", category: "heart", text: "夢をよく見る、眠りが浅い" },

    // --- C. Spleen (Yellow) ---
    { id: "spleen_1", category: "spleen", text: "季節の変わり目に\n体調を崩す" },
    { id: "spleen_2", category: "spleen", text: "考えすぎて、\n物忘れをよくする" },
    { id: "spleen_3", category: "spleen", text: "甘いものがやめられない" },
    { id: "spleen_4", category: "spleen", text: "唇が乾燥する、荒れる" },
    { id: "spleen_5", category: "spleen", text: "口臭が気になる、\nよだれが出る" },
    { id: "spleen_6", category: "spleen", text: "食後すぐに眠くなる" },
    { id: "spleen_7", category: "spleen", text: "胃がもたれる、\n食欲にムラがある" },
    { id: "spleen_8", category: "spleen", text: "雨の日や湿気が多い日が苦手" },

    // --- D. Lung (White) ---
    { id: "lung_1", category: "lung", text: "秋になると調子が悪くなる" },
    { id: "lung_2", category: "lung", text: "悲観的になりやすく、\nネガティブ思考" },
    { id: "lung_3", category: "lung", text: "辛いもの（激辛）が好き" },
    { id: "lung_4", category: "lung", text: "空咳が出る、\nのどが乾燥しやすい" },
    { id: "lung_5", category: "lung", text: "鼻炎、花粉症\n（特に鼻に来る）" },
    { id: "lung_6", category: "lung", text: "肌が乾燥してかゆい、\nアレルギーがある" },
    { id: "lung_7", category: "lung", text: "便秘と下痢を繰り返す" },
    { id: "lung_8", category: "lung", text: "風邪をひくと長引く" },

    // --- E. Kidney (Black) ---
    { id: "kidney_1", category: "kidney", text: "冬の寒さに極端に弱い\n（冷え性）" },
    { id: "kidney_2", category: "kidney", text: "些細なことでビクッとする\n（驚きやすい）" },
    { id: "kidney_3", category: "kidney", text: "和食や塩辛いものが好き" },
    { id: "kidney_4", category: "kidney", text: "白髪や抜け毛が急に増えた" },
    { id: "kidney_5", category: "kidney", text: "耳鳴りがする、\n耳が遠くなった" },
    { id: "kidney_6", category: "kidney", text: "過去に骨折したことがある、\n関節が痛む" },
    { id: "kidney_7", category: "kidney", text: "トイレが近い（頻尿）、\nまたは遠い" },
    { id: "kidney_8", category: "kidney", text: "腰が重い、だるい" },
];

export default function DiagnosisFullPage() {
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
            router.push("/result"); // Go to Result
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen items-center p-6 bg-gray-50/50">
            {/* Header: Pro Version Indicator */}
            <div className="absolute top-4 right-4 z-10">
                <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full opacity-50">
                    Pro (30問Ver)
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-sm mb-8 space-y-2 mt-4">
                <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span>Q.{currentIndex + 1}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <div className="flex-1 w-full flex items-center justify-center max-w-md pb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                    >
                        <Card className="w-full border-none shadow-xl bg-white/90 backdrop-blur">
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
                                        className="h-32 text-lg font-bold border-2 bg-white text-gray-900 border-gray-200 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-sm rounded-xl"
                                        onClick={() => handleChoice(false)}
                                    >
                                        いいえ
                                    </Button>
                                    <Button
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
