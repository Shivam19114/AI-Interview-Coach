export default function QuestionCard({ question }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">

            <h2 className="text-2xl font-semibold mb-4">
                AI Interviewer
            </h2>

            <p className="text-gray-300 leading-8">
                {question}
            </p>

        </div>
    );
}