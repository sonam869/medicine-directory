
"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import MedicineCard from "@/components/MedicineCard";
import { searchMedicines } from "@/lib/fda";
import { Medicine } from "@/lib/types";

export default function Home() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(query: string) {
    setLoading(true);
    setError("");
    setMedicines([]);
    setHasSearched(true);

    try {
      const results = await searchMedicines(query);
      setMedicines(results);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "We couldn't load medicine information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Medicine Directory
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find medicine information
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Search medicine labels to learn about ingredients,
              purpose, warnings, and dosage information.
            </p>

            <div className="mt-8">
              <SearchBar
                onSearch={handleSearch}
                loading={loading}
              />
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Try searching for a brand name like Advil or a generic
              name like Ibuprofen.
            </p>

          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}
        {loading && (
          <div
            className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
            role="status"
            aria-live="polite"
          >
            <p className="font-medium text-gray-900">
              Searching for medicines...
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Please wait while we retrieve the latest available
              medicine information.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
            role="alert"
          >
            <h2 className="font-semibold text-red-800">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

            <p className="mt-3 text-sm text-red-700">
              Please check your connection and try your search again.
            </p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !hasSearched && (
          <div className="py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Search for a medicine
            </h2>

            <p className="mt-2 text-gray-600">
              Enter a brand name or generic name above to see
              available medicine information.
            </p>
          </div>
        )}

        {/* No Results */}
        {!loading &&
          !error &&
          hasSearched &&
          medicines.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                No medicines found
              </h2>

              <p className="mt-2 text-gray-600">
                We couldn't find any medicine records matching your search.
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Try a different brand name or generic name.
              </p>
            </div>
          )}

        {/* Search Results */}
        {!loading &&
          !error &&
          medicines.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>

                <p className="text-sm text-gray-500">
                  {medicines.length}{" "}
                  {medicines.length === 1 ? "result" : "results"}
                </p>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {medicines.map((medicine, index) => (
                  <MedicineCard
                    key={medicine.id || index}
                    medicine={medicine}
                  />
                ))}
              </div>
            </div>
          )}

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-sm leading-6 text-yellow-900">
            <strong>Important:</strong> This directory provides
            informational content from publicly available drug
            labels. It is not a substitute for professional
            medical advice. Consult a qualified healthcare
            professional for medical guidance.
          </p>
        </div>

      </section>
    </main>
  );
}

