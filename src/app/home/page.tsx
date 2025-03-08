"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const GmsPage = () => {
  const [games, setGames] = useState<
    { id: number; name: string; image: string }[]
  >([]);

  // Fetch games data from the JSON file
  useEffect(() => {
    fetch("/data/gms.json")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">
          Games
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/home/${game.id}`}>
              <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">{game.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GmsPage;
