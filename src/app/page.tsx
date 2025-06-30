import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to My Timeline</h1>
      <p className="mt-4 text-lg text-gray-600">
        Create and share your own timelines.
      </p>
      <div className="mt-8">
        <Link
          href="/timelines"
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
