import Link from "next/link";
export default function TopicInterview() {
  const topics = [
    "Python",
    "Java",
    "Data Structures",
    "Machine Learning",
    "HR Interview",
    "JavaScript",
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          Choose Your Interview Topic
        </h1>

        <p className="text-gray-400 text-center mb-12">
          Select a topic and start practicing with AI.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <Link
  key={topic}
  href={`/interview-room?topic=${encodeURIComponent(topic)}`}
  className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition text-2xl font-semibold text-center"
>
  {topic}
</Link>
          ))}
        </div>

      </div>
    </main>
  );
}