import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-4">Oops ! Page non trouvée.</p>
      <Link to="/" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
