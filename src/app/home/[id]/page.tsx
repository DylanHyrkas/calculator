"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Game {
  id: number;
  name: string;
  image: string;
  "game-url": string;
}

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the `id` parameter from the URL
  const [game, setGame] = useState<Game | null>(null);

  // Fetch the game data based on the `id`
  useEffect(() => {
    if (id) {
      fetch("/data/gms.json")
        .then((response) => response.json())
        .then((data: Game[]) => {
          const selectedGame = data.find((game) => game.id === Number(id));
          if (selectedGame) {
            setGame(selectedGame);
          } else {
            router.push("/404"); // Redirect to 404 if the game is not found
          }
        })
        .catch((error) => console.error("Error fetching game data:", error));
    }
  }, [id, router]);

  if (!game) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-semibold mb-8">{game.name}</h1>
      <img
        src={game.image}
        alt={game.name}
        className="w-64 h-64 object-cover rounded-lg mb-8"
      />

      {/* Embed the game based on its URL */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg p-4">
        {game["game-url"].endsWith(".swf") ? (
          <embed
            src={game["game-url"]}
            width="100%"
            height="600"
            className="rounded-lg"
          />
        ) : (
          <iframe
            src={game["game-url"]}
            width="100%"
            height="600"
            className="rounded-lg"
            title={game.name}
          />
        )}
      </div>
    </div>
  );
};

export default GamePage;
