import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">Car Configurator</h1>
      
      <div className="space-x-6">
        <Link 
          to="/" 
          className="text-lg text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out"
        >
          Accueil
        </Link>
        
        <Link 
          to="/configuration" 
          className="text-lg text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out"
        >
          Configuration
        </Link>
        
        <Link 
          to="/login" 
          className="text-lg text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out"
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
