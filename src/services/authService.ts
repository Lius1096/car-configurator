const API_URL = "http://localhost:5000/api/auth"; // Remplace par ton URL d'API

// Enregistrement d'un utilisateur
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Échec de l'inscription");
  }
  return response.json();
};

// Connexion de l'utilisateur
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Identifiants invalides");
  }
  const data = await response.json();
  localStorage.setItem("token", data.token); // Stocke le token
  return data;
};

// Déconnexion de l'utilisateur
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Vérification du token
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(atob(token.split(".")[1])) : null; // Décodage du token JWT
};
