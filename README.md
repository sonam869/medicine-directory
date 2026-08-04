# Medicine Directory

A responsive medicine information directory built with **Next.js**, **TypeScript**, and **Tailwind CSS**. The application allows users to search publicly available medicine label information using the **U.S. FDA Drug Label API**.

Users can search medicines by brand name or generic name, browse matching results, and open a dedicated details page for each medicine record.

---

## Features

- Search medicines by brand name
- Search medicines by generic name
- Display multiple matching medicine records
- Responsive card-based search results
- Dedicated medicine details page
- Dynamic medicine routes using FDA record IDs
- Display active ingredients
- Display medicine purpose
- Display warnings
- Display dosage and administration information
- Loading state during API requests
- API error handling
- No-results state
- Initial search state
- API request timeout handling
- Protection against unexpected API responses
- Missing medicine field handling
- Invalid medicine ID handling
- Dynamic SEO metadata for medicine detail pages
- Responsive design for desktop and mobile devices
- Medical information disclaimer

---

## Tech Stack

- **Next.js** – React framework using the App Router
- **TypeScript** – Type-safe application development
- **React** – User interface development
- **Tailwind CSS** – Styling and responsive design
- **openFDA Drug Label API** – Medicine label data source

---

## Data Source

This project uses the publicly available **U.S. FDA Drug Label API** to retrieve medicine information.

The application uses the following API endpoint:

```text
https://api.fda.gov/drug/label.json
```

The API is used to search for medicine records and retrieve information such as:

Brand name
Generic name
Active ingredients
Purpose
Warnings
Dosage and administration

Project Structure
```text
medicine-directory/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   └── medicine/
│       └── [id]/
│           └── page.tsx
│
├── components/
│   ├── SearchBar.tsx
│   └── MedicineCard.tsx
│
├── lib/
│   ├── fda.ts
│   └── types.ts
│
├── public/
│
├── package.json
├── README.md
├── next.config.ts
├── tsconfig.json
└── eslint.config.mjs

```
Application Architecture

The application follows a simple flow:

```text
User
  │
  ▼
SearchBar
  │
  │ Search query
  ▼
Homepage
  │
  ▼
searchMedicines()
  │
  ▼
openFDA Drug Label API
  │
  ▼
Normalize API Response
  │
  ▼
Medicine[]
  │
  ▼
MedicineCard
  │
  │ FDA Record ID
  ▼
/medicine/[id]
  │
  ▼
getMedicineById()
  │
  ▼
openFDA Drug Label API
  │
  ▼
Medicine Details

```
How It Works
1. Medicine Search

The user enters a medicine name into the search bar.

The application supports searching by:

Brand name
Generic name

For example:
```text
Advil
```
or
```text
Ibuprofen
```

2. Search Results

The API returns matching medicine records.

Each result is normalized into a shared Medicine TypeScript interface.

The results are displayed as responsive medicine cards.

Each card can display:

Brand name
Generic name
Active ingredient
Purpose

3. Medicine Details

Each medicine record has an FDA record ID.

The application uses this ID to create a dynamic route:
```text
/medicine/[id]
```

For example:
```text
/medicine/123456
```

The details page retrieves the specific FDA record and displays:

Medicine name
Generic name
Active ingredients
Purpose
Warnings
Dosage and administration

Error and Edge Case Handling

The application handles several common edge cases.

Empty Search

If the user submits an empty search query, the request is not sent.

Loading State

While medicine data is being retrieved, the user sees a loading message.

No Results

If the FDA API returns no matching records, the application displays a clear no-results message.

API Errors

If the FDA API request fails, the application displays an error message instead of crashing.

Request Timeout

The FDA API request has a timeout to prevent the application from waiting indefinitely for a response.

Invalid Medicine ID

If a user opens an invalid medicine detail URL, the application displays a "Medicine not found" message.

Missing Fields

FDA records may not contain every field. The application handles missing information gracefully and displays an appropriate fallback message.

Unexpected API Responses

The API response is validated before the application processes the results to reduce the risk of runtime errors caused by unexpected data.


Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
npm
1. Clone the Repository
```text
git clone YOUR_GITHUB_REPOSITORY_URL
3. Navigate to the Project
cd medicine-directory
4. Install Dependencies
npm install
5. Start the Development Server
npm run dev
6. Open the Application

Open the following URL in your browser:

http://localhost:3000
Available Scripts

Start the development server:

npm run dev

Create a production build:

npm run build

Start the production server:

npm run start

Run ESLint:

npm run lint
Production Build

Before deploying the application, verify that the production build succeeds:

npm run build

If the build completes successfully, the application can be started in production mode using:

npm run start
```
SEO

Medicine detail pages use dynamic metadata based on the medicine information.

For example, a medicine page can have a title such as:
```text
Advil (Ibuprofen) | Medicine Directory
```

This provides more descriptive page titles for individual medicine records.

Disclaimer

This application is intended for informational and educational purposes only.

The medicine information displayed by this application is sourced from publicly available FDA drug label data.

This application does not provide medical advice, diagnosis, or treatment recommendations.

Always consult a qualified healthcare professional before making decisions regarding medications or medical treatment.

Future Improvements

Possible future improvements include:

Search suggestions and autocomplete
Debounced search
Pagination for large result sets
Search history
Favorite medicines
Improved filtering and sorting
Additional medicine information sources
Improved accessibility
Automated testing
Deployment with a public production URL





