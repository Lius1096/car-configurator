// src/components/Dashboard.tsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Importer le composant Sidebar
import Loader from "../components/Loader"; // Loader pour les données
import { useAuth } from "../context/AuthContext"; // Importer useAuth

interface Devis {
  id: number;
  date: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalDevis: 0,
    devisEnCours: 0,
    devisComplets: 0,
  });
  const [devisRecents, setDevisRecents] = useState<Devis[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await fetch("/api/dashboard/stats");
        const statsData = await statsResponse.json();
        setStatistics(statsData);

        const devisResponse = await fetch("/api/dashboard/devis-recents");
        const devisData = await devisResponse.json();
        setDevisRecents(devisData);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar statistics={statistics} />
      
      {/* Main Panel */}
      <div className="flex-1 p-8">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Bienvenue sur votre tableau de bord</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Statistiques */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold">Statistiques</h3>
                <ul className="mt-4 space-y-2">
                  <li className="text-gray-600">
                    <strong>Total de devis :</strong> {statistics.totalDevis}
                  </li>
                  <li className="text-gray-600">
                    <strong>Devis en cours :</strong> {statistics.devisEnCours}
                  </li>
                  <li className="text-gray-600">
                    <strong>Devis complets :</strong> {statistics.devisComplets}
                  </li>
                </ul>
              </div>

              {/* Devis récents */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 col-span-2">
                <h3 className="text-xl font-semibold">Devis récents</h3>
                <div className="space-y-4 mt-4">
                  {devisRecents.map((devis) => (
                    <div key={devis.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">Devis #{devis.id}</h4>
                        <p className="text-sm text-gray-600">Date : {devis.date}</p>
                      </div>
                      <button className="text-blue-500 hover:text-blue-700">
                        Voir le devis
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications ou autres sections dynamiques */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold">Notifications</h3>
                <p className="text-gray-600 mt-4">
                  Vous avez 3 notifications récentes concernant vos devis.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
