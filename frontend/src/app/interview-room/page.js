"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function InterviewRoom() {
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");

    const [question, setQuestion] = useState("Loading question...");

    useEffect(() => {
        if (!topic) return;

        const fetchQuestion = async () => {
            try {
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

        fetchQuestion();

    }, [topic]);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Interview Room
                </h1>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">

                    <h2 className="text-2xl font-semibold mb-4">
                        AI Interviewer
                    </h2>

                    <p className="text-gray-300">
                        {question}
                    </p>

                </div>

                <textarea
                    placeholder="Type your answer here..."
                    className="w-full h-40 bg-gray-900 border border-gray-800 rounded-xl p-4"
                />

                <button className="mt-6 bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition">
                    Submit Answer
                </button>

            </div>

        </main>
    );
}