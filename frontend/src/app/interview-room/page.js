"use client";

import { useSearchParams } from "next/navigation";

export default function InterviewRoom() {
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");

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
                        {topic
                            ? `Welcome to the ${topic} interview. Your first question will appear here.`
                            : "No topic selected."}
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