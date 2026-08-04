
import Link from "next/link";

export default function MedicinePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-800"
        >
          ← Back to Search
        </Link>

        {/* Medicine Directory Card */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900">
            Medicine Directory
          </h1>

          {/* Description */}
          <p className="mt-4 text-gray-600">
            Search for a medicine to view detailed information.
          </p>

          {/* Search Box */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter medicine name..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="button"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Information Section */}
          <div className="mt-8 rounded-xl bg-blue-50 p-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900">
              Medicine Information
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Enter the name of a medicine in the search box above to find
              information about its uses, dosage, side effects, and other
              important details.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
