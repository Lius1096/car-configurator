import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

// Définir l'interface de ton contexte
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Créer un contexte d'authentification avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Créer un fournisseur de contexte
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Charger l'utilisateur à partir du localStorage (si authentifié)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  // Fonction pour se connecter
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const token = response.data.token;

      // Sauvegarder le token dans le localStorage
      localStorage.setItem('token', token);

      // Charger les informations de l'utilisateur
      const userResponse = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userResponse.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Créer un hook personnalisé pour accéder au contexte
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
