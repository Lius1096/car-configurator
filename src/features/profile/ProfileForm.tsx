import { useState } from "react";
import { updateUserProfile } from "../../services/userService";

// Définition du type User (si ce n'est pas déjà fait)
interface User {
  name: string;
  email: string;
  avatar: string; // URL ou base64
}

function ProfileForm({ user, setUser }: { user: User; setUser: React.Dispatch<React.SetStateAction<User | null>> }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification du type d'image
      if (file.type.startsWith('image/')) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result as string); // Affichage immédiat de l'image
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez télécharger un fichier image');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedAvatar = avatar;

      // Si un fichier est sélectionné, envoie l'image au serveur
      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);

        const response = await fetch("/api/upload-avatar", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          updatedAvatar = data.url; // URL de l'image téléchargée
        }
      }

      // Met à jour le profil de l'utilisateur avec les nouvelles données
      const updatedUser = await updateUserProfile({ name, email, avatar: updatedAvatar });
      setUser(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-semibold">Nom :</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />

      <label className="font-semibold">Email :</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <label className="font-semibold">Photo de profil :</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="border p-2 rounded"
      />
      {avatar && (
        <div className="mt-2">
          <img
            src={avatar}
            alt="Aperçu de l'avatar"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Enregistrement..." : "Mettre à jour"}
      </button>

      {loading && <p className="text-center mt-2">Chargement de l'image...</p>}
    </form>
  );
}

export default ProfileForm;
