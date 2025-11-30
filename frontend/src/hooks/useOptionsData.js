import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function useOptionsData() {
  const [defs, setDefs] = useState({
    paint: [],
    wheels: [],
    interior: [],
    extras: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const categories = ["paint", "wheels", "interior", "extras"];
        const results = await Promise.all(
          categories.map(async (cat) => {
            const url = `${API_BASE_URL}/cars${cat ? `?category=${cat}` : ""}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Erreur fetch ${cat}`);
            return res.json();
          })
        );
        setDefs({
          paint: results[0],
          wheels: results[1],
          interior: results[2],
          extras: results[3],
        });
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les options depuis le serveur.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { defs, loading, error };
}
