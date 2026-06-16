export default function Home() {
  const features = [
    {
      title: "Topic-Based Interviews",
      description:
        "Practice interviews based on your chosen topic and improve step by step.",
    },
    {
      title: "Resume-Based Interviews",
      description:
        "Upload your resume and get personalized interview questions.",
    },
    {
      title: "AI Feedback",
      description:
        "Receive detailed feedback, correct answers, and improvement tips.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">
          AI Interview Coach
        </h1>

        <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Crack Interviews <br />
          <span className="text-blue-500">with AI</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
          Practice topic-based and resume-based interviews with
          real-time AI feedback through text, voice, and video.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <a
  href="/topic-interview"
  className="bg-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition"
>
  Start Topic Interview
</a>

          <button className="border border-gray-700 px-8 py-4 rounded-xl text-lg hover:bg-gray-900 transition">
            Upload Resume
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 pb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        © 2026 AI Interview Coach. All rights reserved.
      </footer>
    </main>
  );
}