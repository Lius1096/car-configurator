// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  statistics: {
    totalDevis: number;
    devisEnCours: number;
    devisComplets: number;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ statistics }) => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white shadow-md p-6">
      {/* Profil */}
      <div className="flex flex-col items-center">
        <img
          src={user.profilePic || "/default-profile.png"}
          alt="Profil"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      {/* Navigation */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-medium text-lg">Navigation</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-blue-500 hover:text-blue-700">
              Projets
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-blue-500 hover:text-blue-700">
              Paramètres
            </Link>
          </li>
        </ul>
      </div>

      {/* Statistiques */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-medium text-lg">Statistiques</h3>
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

      {/* Déconnexion */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
