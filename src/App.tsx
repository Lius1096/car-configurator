import { AuthProvider } from "./context/AuthContext";
//import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import './Styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthProvider>
        <Navbar />
        <AppRoutes /> {/* Affichage des routes */}
        
      </AuthProvider>
    </div>
  );
}

export default App;
