"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Result Types Definition
type ResultType = "liver" | "heart" | "spleen" | "lung" | "kidney";

const RESULT_CONTENT: Record<ResultType, {
    title: string;
    color: string;
    archetype: string;
    missingColor: string;
    advice: string;
    hint: string;
}> = {
    liver: {
        title: "青の開拓者",
        color: "text-brand-blue",
        archetype: "（肝タイプ）",
        missingColor: "青（緑）",
        advice: "今日からハンバーガーを食べてもOK。\nただし、「大量のレタス」や「レモン水」を足してください。",
        hint: "酸味が油を急速分解し、溜まった怒りのエネルギーを脂肪燃焼力に変えるからです。",
    },
    heart: {
        title: "赤の表現者",
        color: "text-brand-red",
        archetype: "（心タイプ）",
        missingColor: "赤",
        advice: "今日から焼肉を食べてもOK。\nただし、「トマト」や「赤身肉」を中心に選んでください。",
        hint: "赤い色素が血液ポンプを加速させ、代謝のスイッチを強制的にONにするからです。",
    },
    spleen: {
        title: "黄の守護者",
        color: "text-brand-deepYellow",
        archetype: "（脾タイプ）",
        missingColor: "黄",
        advice: "今日からスイーツを食べてもOK。\nただし、「さつまいも」や「かぼちゃ」の自然な甘みを足してください。",
        hint: "黄色い食材が胃腸の『満腹センサー』を正常化し、ドカ食い衝動を自然に消滅させるからです。",
    },
    lung: {
        title: "白の審美眼",
        color: "text-gray-500",
        archetype: "（肺タイプ）",
        missingColor: "白",
        advice: "今日から激辛料理を食べてもOK。\nただし、「大根おろし」や「豆腐」を必ずセットにしてください。",
        hint: "白い食材が乾燥した粘膜を潤し、バリア機能を高めることで、溜め込んだ毒素を排出するからです。",
    },
    kidney: {
        title: "黒の賢者",
        color: "text-brand-black",
        archetype: "（腎タイプ）",
        missingColor: "黒",
        advice: "今日からラーメンを食べてもOK。\nただし、「きくらげ」や「海苔」を山盛りにトッピングしてください。",
        hint: "黒い食材が生命力のバッテリーを充電し、冷え切った代謝炉に火をつけるからです。",
    },
};

const FIXED_RESULT_CONTENT: Record<ResultType, {
    title: string;
    color: string;
    archetype: string;
    missingColor: string;
    advice: string;
    hint: string;
}> = {
    liver: {
        title: "青の開拓者",
        color: "text-brand-blue",
        archetype: "（肝タイプ）",
        missingColor: "青（緑）",
        advice: "今日からハンバーガーを食べてもOK。\nただし、「大量のレタス」や「レモン水」を足してください。",
        hint: "酸味が油を急速分解し、溜まった怒りのエネルギーを脂肪燃焼力に変えるからです。",
    },
    heart: {
        title: "赤の表現者",
        color: "text-brand-red",
        archetype: "（心タイプ）",
        missingColor: "赤",
        advice: "今日から焼肉を食べてもOK。\nただし、「トマト」や「赤身肉」を中心に選んでください。",
        hint: "赤い色素が血液ポンプを加速させ、代謝のスイッチを強制的にONにするからです。",
    },
    spleen: {
        title: "黄の守護者",
        color: "text-brand-deepYellow",
        archetype: "（脾タイプ）",
        missingColor: "黄",
        advice: "今日からスイーツを食べてもOK。\nただし、「さつまいも」や「かぼちゃ」の自然な甘みを足してください。",
        hint: "黄色い食材が胃腸の『満腹センサー』を正常化し、ドカ食い衝動を自然に消滅させるからです。",
    },
    lung: {
        title: "白の審美眼",
        color: "text-gray-500",
        archetype: "（肺タイプ）",
        missingColor: "白",
        advice: "今日から激辛料理を食べてもOK。\nただし、「大根おろし」や「豆腐」を必ずセットにしてください。",
        hint: "白い食材が乾燥した粘膜を潤し、バリア機能を高めることで、溜め込んだ毒素を排出するからです。",
    },
    kidney: {
        title: "黒の賢者",
        color: "text-brand-black",
        archetype: "（腎タイプ）",
        missingColor: "黒",
        advice: "今日からラーメンを食べてもOK。\nただし、「きくらげ」や「海苔」を山盛りにトッピングしてください。",
        hint: "黒い食材が生命力のバッテリーを充電し、冷え切った代謝炉に火をつけるからです。",
    },
};

export default function ResultPage() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [result, setResult] = useState<ResultType | null>(null);
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        // 1. Check if user is already registered (Simulated by LocalStorage flag)
        const registeredFlag = localStorage.getItem("is_registered");
        if (registeredFlag === "true") {
            setIsRegistered(true);
        }

        // 2. Calculate Result
        const storedAnswers = localStorage.getItem("diagnosis_answers");
        if (!storedAnswers) {
            router.push("/"); // Redirect if no data
            return;
        }

        const answers: Record<string, boolean> = JSON.parse(storedAnswers);
        const scores = { liver: 0, heart: 0, spleen: 0, lung: 0, kidney: 0 };

        Object.entries(answers).forEach(([key, value]) => {
            if (value) {
                const category = key.split("_")[0] as ResultType;
                if (scores[category] !== undefined) {
                    scores[category]++;
                }
            }
        });

        // Determine Winner (Priority: Kidney > Liver > Spleen > Lung > Heart)
        const priority = ["kidney", "liver", "spleen", "lung", "heart"];

        // Create scoring array
        const resultsArray = priority.map((type, index) => ({
            type: type as ResultType,
            score: scores[type as ResultType],
            priorityIndex: index
        }));

        // Sort: Score Descending, then Priority Ascending
        resultsArray.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.priorityIndex - b.priorityIndex;
        });

        setResult(resultsArray[0].type);

    }, [router]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // In real app, send to API (UTAGE)
            localStorage.setItem("is_registered", "true");
            setIsRegistered(true);
        }
    };

    if (!result) return <div className="min-h-screen flex items-center justify-center font-bold animate-pulse">AI解析中...</div>;

    const content = FIXED_RESULT_CONTENT[result];

    // --- VIEW: OPT-IN GATE ---
    if (!isRegistered) {
        return (
            <div className="flex flex-col w-full min-h-screen items-center justify-center p-6 bg-brand-yellow/10">
                <Card className="w-full max-w-md shadow-2xl border-4 border-white animate-in zoom-in-95 duration-500 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <CardHeader className="text-center space-y-4 pt-10 relative z-10">
                        <div className="mx-auto bg-brand-black text-white font-bold px-6 py-2 rounded-full text-sm inline-block shadow-lg">
                            解析完了
                        </div>
                        <CardTitle className="text-3xl font-extrabold tracking-tight">
                            太り癖の<span className="text-brand-red underline decoration-brand-yellow decoration-4 underline-offset-4">正体</span>が<br />判明しました
                        </CardTitle>
                        <CardDescription className="text-gray-600 font-medium">
                            あなたが今まで痩せなかったのは、<br />
                            努力不足でも根性無しでもありません。<br />
                            <strong className="text-brand-black">「ある色」が足りなかっただけです。</strong>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 pt-2">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="メールアドレスを入力して結果を見る"
                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-brand-yellow/50 focus:border-brand-yellow outline-none transition-all font-bold text-lg placeholder:font-normal"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full text-xl h-16 bg-brand-yellow hover:bg-yellow-400 text-black border-b-4 border-yellow-600 hover:border-yellow-500 shadow-xl font-extrabold rounded-xl transition-all active:translate-y-1 active:border-b-0 animate-pulse-fast">
                                結果を今すぐ見る
                                <span className="ml-2 text-sm font-normal bg-black/10 px-2 py-0.5 rounded">無料</span>
                            </Button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                ※診断結果ページで「5色レシピ」もお渡しします。
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // --- VIEW: RESULT (Pattern Breaker Ver.) ---
    return (
        <div className="flex flex-col w-full min-h-screen bg-white pb-20">

            {/* Result Header: High Contrast & Huge Text */}
            <div className="relative w-full bg-white text-center pt-12 pb-8 px-4 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-gray-50 rounded-b-[50%] -z-10" />

                <div className="inline-block bg-brand-black text-white font-bold px-4 py-1.5 rounded-full text-xs mb-6 tracking-wider">
                    あなたが痩せなかった本当の理由
                </div>

                <h2 className="text-lg font-bold text-gray-600 mb-2">
                    あなたの内臓は…
                </h2>

                <div className={`text-5xl md:text-6xl font-black mb-1 ${content.color} tracking-tighter leading-none filters drop-shadow-sm`}>
                    {content.title}
                </div>
                <p className="text-gray-400 font-bold mb-8 text-sm">{content.archetype}</p>

                <div className="bg-brand-red/10 border-2 border-brand-red/20 mx-auto max-w-sm rounded-xl p-4 text-brand-red font-bold animate-bounce-slight">
                    <span className="block text-2xl mb-1">⚠️</span>
                    内臓の「{content.missingColor}」が<br />足りていません！
                </div>
            </div>

            {/* Advice Section: Pattern Breaker */}
            <div className="px-6 relative z-10 -mt-2">
                <Card className="w-full shadow-xl border-none bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
                    {/* Tape decoration */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-yellow/50 rotate-[-2deg] shadow-sm z-20" />

                    <CardContent className="p-8 pt-10 space-y-8 text-center">

                        <div className="space-y-4">
                            <h3 className="font-bold text-xl text-gray-800">
                                <span className="bg-brand-yellow/50 px-2">食事制限</span>は、<br />
                                逆効果でした。
                            </h3>
                            <p className="text-lg font-bold text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {content.advice}
                            </p>
                        </div>

                        <div className="bg-white border-2 border-brand-black rounded-xl p-4 text-left relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="absolute -top-3 -left-3 bg-brand-black text-white text-xs font-bold px-3 py-1 rounded-lg rotate-[-5deg]">
                                WHY?
                            </div>
                            <p className="text-sm font-bold text-gray-800 leading-normal pt-2">
                                <span className="text-gray-400 text-xs block mb-1">なぜ、食べても痩せるのか？</span>
                                {content.hint}
                            </p>
                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* CTA Section: Video Style */}
            <div className="p-6 mt-8">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-extrabold text-2xl text-brand-black">
                            まだ、<br />
                            野菜サラダばかり<br />
                            食べているんですか？
                        </h3>
                        <p className="text-sm text-gray-600">
                            あなたのタイプに合った「5色の組み合わせ」を知れば、<br />
                            ハンバーガーも焼肉も、<br />
                            <strong className="text-brand-red underline decoration-brand-yellow decoration-4">「痩せる食事」に変わります。</strong>
                        </p>
                    </div>

                    <a
                        href="#" // Dummy Link - Replace with actual URL
                        className="block w-full group"
                    >
                        {/* Video Style CTA Button */}
                        <div className="relative bg-brand-yellow border-4 border-brand-black text-brand-black rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-bold px-4 py-1 rounded-full border-2 border-white shadow-md animate-pulse">
                                無料ウェビナーで公開中
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-1 mt-2">
                                <span className="font-extrabold text-xl md:text-2xl tracking-tight leading-none">
                                    具体的な5色の<br />組み合わせを見る
                                </span>
                                <span className="text-xs font-bold opacity-80 backdrop-blur-sm px-2 rounded">
                                    ▶︎ 今すぐ視聴する（完全無料）
                                </span>
                            </div>
                        </div>
                    </a>

                    <p className="text-xs text-gray-400">
                        ※視聴者の9割が「目からウロコ」と回答
                    </p>
                </div>
            </div>
        </div>
    );
}
