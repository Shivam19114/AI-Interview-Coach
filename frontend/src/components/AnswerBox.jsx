export default function AnswerBox({
    answer,
    setAnswer
}) {
    return (
        <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-40 bg-gray-900 border border-gray-800 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}