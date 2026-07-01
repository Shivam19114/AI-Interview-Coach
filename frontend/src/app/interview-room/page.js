import InterviewHeader from "@/components/InterviewHeader";
import QuestionCard from "@/components/QuestionCard";
import AnswerBox from "@/components/AnswerBox";

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";



export default function InterviewRoom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");

    const [question, setQuestion] = useState("Loading question...");
    const [questionCount, setQuestionCount] = useState(1);
    const [scores, setScores] = useState([]);
    const [difficulty, setDifficulty] = useState("Beginner");
    const averageScore =
        scores.length > 0
            ? (
                scores.reduce((a, b) => a + b, 0) /
                scores.length
            ).toFixed(1)
            : 0;
    const [answer, setAnswer] = useState("");
    const [evaluation, setEvaluation] = useState("");
    const [isEvaluating, setIsEvaluating] = useState(false);

    const handleSubmit = async () => {
        if (!answer.trim()) return;

        setIsEvaluating(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/evaluate-answer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question,
                        answer,
                    }),
                }
            );

            const data = await response.json();

            setEvaluation(data.evaluation);

            const scoreMatch = data.evaluation.match(/Score:\s*(\d+)/);

            if (scoreMatch) {
                setScores(prev => [
                    ...prev,
                    Number(scoreMatch[1])
                ]);
            }

        } catch (error) {
            console.error(error);
            setEvaluation("Failed to evaluate answer.");
        }

        setIsEvaluating(false);
    };

    const fetchQuestion = async () => {
        if (!topic) return;

        try {
            setQuestion("Loading question...");

            const response = await fetch(
                "http://127.0.0.1:8000/generate-question",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ topic }),
                }
            );

            const data = await response.json();

            setQuestion(data.question);

        } catch (error) {
            console.error(error);
            setQuestion("Failed to load question.");
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [topic]);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">

            <div className="max-w-3xl mx-auto">

                <InterviewHeader
                    questionCount={questionCount}
                    difficulty={difficulty}
                />

                <QuestionCard question={question} />

                <AnswerBox
                    answer={answer}
                    setAnswer={setAnswer}
                />

                <div className="mt-6 flex flex-wrap gap-4">

                    <button
                        onClick={handleSubmit}
                        disabled={isEvaluating}
                        className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isEvaluating ? "Evaluating..." : "Submit Answer"}
                    </button>

                    <button
                        onClick={() => {
                            const confirmExit = window.confirm(
                                "Are you sure you want to stop the interview?"
                            );

                            if (confirmExit) {

                                alert(
                                    `Interview Summary

Total Questions: ${questionCount}

Average Score: ${averageScore}/10`
                                );

                                router.push("/");
                            }
                        }}
                        className="bg-red-600 px-8 py-4 rounded-xl hover:bg-red-700 transition"
                    >
                        Stop Interview
                    </button>

                </div>

                {evaluation && (
                    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            AI Feedback
                        </h2>

                        <pre className="whitespace-pre-wrap text-gray-300">
                            {evaluation}
                        </pre>
                    </div>
                )}

                {evaluation && (
                    <button
                        onClick={() => {
                            setAnswer("");
                            setEvaluation("");

                            setQuestionCount(prev => prev + 1);

                            fetchQuestion();
                        }}
                        className="mt-6 bg-green-600 px-8 py-4 rounded-xl hover:bg-green-700 transition"
                    >
                        Next Question
                    </button>
                )}

            </div>

        </main>
    );
}