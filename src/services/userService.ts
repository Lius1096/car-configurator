const API_URL = "http://localhost:5000/api/users"; // Remplace par ton URL d'API

// Fonction pour récupérer les infos de l'utilisateur connecté
export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = response.status === 401 ? "Session expirée. Veuillez vous reconnecter." : "Impossible de récupérer le profil";
    throw new Error(errorMessage);
  }
  return response.json();
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (updatedData: { name?: string; email?: string; avatar?: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorMessage = response.status === 401 ? "Session expirée. Veuillez vous reconnecter." : "Erreur lors de la mise à jour du profil";
    throw new Error(errorMessage);
  }
  return response.json();
};

// Fonction pour supprimer le compte utilisateur
export const deleteUserAccount = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = response.status === 401 ? "Session expirée. Veuillez vous reconnecter." : "Échec de la suppression du compte";
    throw new Error(errorMessage);
  }
  return response.json();
};
