import { Medicine } from "./types";

const FDA_BASE_URL = "https://api.fda.gov/drug/label.json";

const REQUEST_TIMEOUT = 10000;

interface FDAResult {
  id?: string;

  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
  };

  active_ingredient?: string[];
  purpose?: string[];
  warnings?: string[];
  dosage_and_administration?: string[];
}

interface FDAResponse {
  results?: FDAResult[];
}

/**
 * Fetch data from the FDA API with a timeout.
 */
async function fetchFDA(
  url: string
): Promise<FDAResponse> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    // FDA returns 404 when no matching records are found.
    if (response.status === 404) {
      return {
        results: [],
      };
    }

    if (!response.ok) {
      throw new Error(
        `FDA API request failed with status ${response.status}`
      );
    }

    const data: unknown = await response.json();

    // Protect against unexpected or malformed API responses.
    if (
      typeof data !== "object" ||
      data === null ||
      !("results" in data)
    ) {
      return {
        results: [],
      };
    }

    const results = (data as FDAResponse).results;

    if (!Array.isArray(results)) {
      return {
        results: [],
      };
    }

    return {
      results,
    };
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new Error(
        "The FDA request timed out. Please try again."
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "An unexpected error occurred while fetching medicine data."
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Convert an FDA API result into our Medicine format.
 */
function normalizeMedicine(
  result: FDAResult
): Medicine {
  return {
    id: result.id,

    brandName:
      result.openfda?.brand_name?.[0],

    genericName:
      result.openfda?.generic_name?.[0],

    activeIngredient:
      result.active_ingredient,

    purpose:
      result.purpose,

    warnings:
      result.warnings,

    dosageAndAdministration:
      result.dosage_and_administration,
  };
}

/**
 * Search medicines by brand name or generic name.
 */
export async function searchMedicines(
  query: string
): Promise<Medicine[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const encodedQuery =
    encodeURIComponent(trimmedQuery);

  const url =
    `${FDA_BASE_URL}?search=` +
    `(openfda.brand_name:"${encodedQuery}"` +
    `+OR+openfda.generic_name:"${encodedQuery}")` +
    `&limit=20`;

  const data = await fetchFDA(url);

  return (data.results ?? [])
    .filter((result) => result && typeof result === "object")
    .map(normalizeMedicine);
}

/**
 * Get a medicine by its brand name.
 *
 * This function is kept for compatibility,
 * although the application now uses ID-based routing.
 */
export async function getMedicineByName(
  name: string
): Promise<Medicine | null> {
  const decodedName =
    decodeURIComponent(name).trim();

  if (!decodedName) {
    return null;
  }

  const encodedName =
    encodeURIComponent(decodedName);

  const url =
    `${FDA_BASE_URL}?search=` +
    `openfda.brand_name:"${encodedName}"` +
    `&limit=1`;

  const data = await fetchFDA(url);

  const result = data.results?.[0];

  if (!result) {
    return null;
  }

  return normalizeMedicine(result);
}

/**
 * Get an exact medicine record using its FDA ID.
 */
export async function getMedicineById(
  id: string
): Promise<Medicine | null> {
  const decodedId =
    decodeURIComponent(id).trim();

  if (!decodedId) {
    return null;
  }

  const encodedId =
    encodeURIComponent(decodedId);

  const url =
    `${FDA_BASE_URL}?search=` +
    `id:"${encodedId}"` +
    `&limit=1`;

  const data = await fetchFDA(url);

  const result = data.results?.[0];

  if (!result) {
    return null;
  }

  return normalizeMedicine(result);
}