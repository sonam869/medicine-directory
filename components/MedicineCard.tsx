import Link from "next/link";

import { Medicine } from "@/lib/types";

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({
  medicine,
}: MedicineCardProps) {
  const medicineName =
    medicine.brandName ||
    medicine.genericName ||
    "Unknown Medicine";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Medicine Name */}
      <h2 className="text-xl font-semibold text-gray-900">
        {medicineName}
      </h2>

      {/* Generic Name */}
      {medicine.genericName && (
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium">Generic name:</span>{" "}
          {medicine.genericName}
        </p>
      )}

      {/* Active Ingredient */}
      {medicine.activeIngredient &&
        medicine.activeIngredient.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Active Ingredient
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-700">
              {medicine.activeIngredient[0]}
            </p>
          </div>
        )}

      {/* Purpose */}
      {medicine.purpose &&
        medicine.purpose.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Purpose
            </h3>

            <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-700">
              {medicine.purpose[0]}
            </p>
          </div>
        )}

      {/* Details Link */}
      <div className="mt-auto pt-6">
        {medicine.id ? (
          <Link
            href={`/medicine/${encodeURIComponent(
              medicine.id
            )}`}
            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View medicine details →
          </Link>
        ) : (
          <p className="text-sm text-gray-500">
            Detailed information unavailable
          </p>
        )}
      </div>
    </article>
  );
}