import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Mon Profil</h2>
        <p className="text-lg">Nom : {user.name}</p>
        <p className="text-lg">Email : {user.email}</p>
        <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Profile;
