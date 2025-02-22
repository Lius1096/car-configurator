import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import Avatar from "./Avatar";
import { fetchUserProfile } from "../../services/userService"; // Correction ici

// Définition du type User pour améliorer le typage
interface User {
  name: string;
  email: string;
  avatar: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await fetchUserProfile(); // Utilisation de la fonction correcte
        setUser(data);
      } catch (error) {
        setError("Erreur lors du chargement du profil.");
        console.error("Erreur lors du chargement du profil :", error);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center">Mon Profil</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {user ? (
        <>
          <div className="flex justify-center my-4">
            <Avatar src={user.avatar} alt={user.name} />
          </div>
          <ProfileForm user={user} setUser={setUser} />
        </>
      ) : (
        <p className="text-center text-gray-500">Chargement du profil...</p>
      )}
    </div>
  );
}

export default Profile;
