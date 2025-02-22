import { Link } from "react-router-dom";

const CarCard = ({ car }: { car: any }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105">
      <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
        <p className="text-gray-600">{car.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-semibold text-blue-600">{car.price} €</span>
          <Link
            to={`/configuration/${car.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Configurer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
