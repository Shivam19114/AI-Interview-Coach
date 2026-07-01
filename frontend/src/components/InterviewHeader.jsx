export default function InterviewHeader({
    questionCount,
    difficulty
}) {
    return (
        <div className="mb-8">

            <h1 className="text-4xl font-bold">
                Interview Room
            </h1>

            <p className="text-gray-400 mt-2">
                Question #{questionCount}
            </p>

            <p className="text-blue-400">
                Difficulty: {difficulty}
            </p>

        </div>
    );
}