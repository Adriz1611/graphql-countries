"use client"; // Enables client-side functionality
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import client from "../lib/apollo-client";
import { GET_COUNTRY } from "../lib/queries";

export default function Home() {
  const [countryCode, setCountryCode] = useState("");
  const [getCountry, { loading, error, data }] = useLazyQuery(GET_COUNTRY, {
    client,
  });

  const handleFetchCountry = () => {
    if (countryCode.trim()) {
      getCountry({ variables: { code: countryCode.toUpperCase() } });
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Country Info Finder
        </h1>

        {/* Input Field for Country Code */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="countryCode">
            Enter Country Code (e.g., BR for Brazil):
          </label>
          <input
            type="text"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country code"
          />
        </div>

        {/* Fetch Button */}
        <button
          onClick={handleFetchCountry}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Fetch Country Details
        </button>

        {/* Loading State */}
        {loading && <p className="mt-4 text-gray-500">Loading...</p>}

        {/* Error State */}
        {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}

        {/* Country Details */}
        {data && data.country && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Country Details
            </h2>
            <p>
              <strong>Name:</strong> {data.country.name}
            </p>
            <p>
              <strong>Native Name:</strong> {data.country.native}
            </p>
            <p>
              <strong>Capital:</strong> {data.country.capital}
            </p>
            <p>
              <strong>Emoji:</strong> {data.country.emoji}
            </p>
            <p>
              <strong>Currency:</strong> {data.country.currency}
            </p>
            <p className="mt-4">
              <strong>Languages:</strong>
            </p>
            <ul className="list-disc ml-5">
              {data.country.languages.map((lang) => (
                <li key={lang.code} className="text-gray-700">
                  {lang.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
