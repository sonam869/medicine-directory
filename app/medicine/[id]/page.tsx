import type { Metadata } from "next";
import Link from "next/link";

import { getMedicineById } from "@/lib/fda";

interface MedicinePageProps {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata({
  params,
}: MedicinePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const medicine = await getMedicineById(id);

    if (!medicine) {
      return {
        title: "Medicine Not Found | Medicine Directory",
        description:
          "The requested medicine information could not be found.",
      };
    }

    const medicineName =
      medicine.brandName ||
      medicine.genericName ||
      "Medicine";

    const genericName = medicine.genericName
      ? ` (${medicine.genericName})`
      : "";

    return {
      title: `${medicineName}${genericName} | Medicine Directory`,
      description:
        `View medicine information for ${medicineName}, including active ingredients, purpose, warnings, and dosage information.`,
    };
  } catch {
    return {
      title: "Medicine Information | Medicine Directory",
      description:
        "View publicly available medicine label information.",
    };
  }
}
export default async function MedicinePage({
  params,
}: MedicinePageProps) {
  const { id } = await params;

  let medicine;

  try {
    medicine = await getMedicineById(id);
  } catch (error) {
    console.error("Medicine fetch error:", error);

    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Search
          </Link>

          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-2xl font-bold text-red-900">
              Something went wrong
            </h1>

            <p className="mt-3 text-red-800">
              We couldn't load the medicine information.
              Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!medicine) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Search
          </Link>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Medicine not found
            </h1>

            <p className="mt-3 text-gray-700">
              We couldn't find this medicine record.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Search Again
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Search
        </Link>

        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Medicine Information
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            {medicine.brandName || "Medicine Information"}
          </h1>

          {medicine.genericName && (
            <p className="mt-3 text-lg text-gray-700">
              Generic name: {medicine.genericName}
            </p>
          )}
        </header>

        <div className="mt-8 space-y-6">
          <InfoSection
            title="Active Ingredients"
            content={medicine.activeIngredient}
          />

          <InfoSection
            title="Purpose"
            content={medicine.purpose}
          />

          <InfoSection
            title="Warnings"
            content={medicine.warnings}
          />

          <InfoSection
            title="Dosage & Administration"
            content={medicine.dosageAndAdministration}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
          <h2 className="font-semibold text-yellow-950">
            Important Health Information
          </h2>

          <p className="mt-2 text-sm leading-6 text-yellow-900">
            This information is provided for educational
            purposes and is based on publicly available drug
            label data. It is not a substitute for professional
            medical advice. Consult a qualified healthcare
            professional for medical guidance.
          </p>
        </div>
      </div>
    </main>
  );
}

interface InfoSectionProps {
  title: string;
  content?: string[];
}

function InfoSection({
  title,
  content,
}: InfoSectionProps) {
  const hasContent =
    content && content.length > 0;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      {hasContent ? (
        <div className="mt-4 space-y-3">
          {content.map((item, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-sm leading-7 text-gray-700"
            >
              {item}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm italic text-gray-500">
          Information not available in the available drug
          label.
        </p>
      )}
    </section>
  );
}