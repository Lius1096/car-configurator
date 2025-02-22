import React, { useState, useEffect } from "react";
import axios from "axios";

// Typage des données
interface CarModel {
  _id: string;
  name: string;
}

interface Engine {
  _id: string;
  name: string;
}

interface Color {
  _id: string;
  name: string;
}

interface AdditionalEquipment {
  _id: string;
  name: string;
}

const ConfigurationForm = () => {
  // Définir les types explicites pour chaque tableau d'état
  const [carModels, setCarModels] = useState<CarModel[]>([]); // Liste des modèles de voitures
  const [engines, setEngines] = useState<Engine[]>([]); // Liste des moteurs
  const [colors, setColors] = useState<Color[]>([]); // Liste des couleurs
  const [additionalEquipments, setAdditionalEquipments] = useState<AdditionalEquipment[]>([]); // Liste des équipements
  const [selectedCarModel, setSelectedCarModel] = useState<string>("");
  const [selectedEngine, setSelectedEngine] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedAdditionalEquipments, setSelectedAdditionalEquipments] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Récupérer les données depuis l'API (par exemple, les modèles de voiture, couleurs, moteurs, etc.)
    const fetchData = async () => {
      try {
        const [models, engines, colors, equipments] = await Promise.all([
          axios.get("/api/carmodels"),
          axios.get("/api/engines"),
          axios.get("/api/colors"),
          axios.get("/api/additionalequipments"),
        ]);

        console.log("Models:", models.data); // Vérifier la structure des données

        // Vérifier si la réponse est bien un tableau avant de l'utiliser
        if (Array.isArray(models.data)) {
          setCarModels(models.data);
        } else {
          console.error("Les modèles de voitures ne sont pas sous forme de tableau");
        }

        setEngines(engines.data);
        setColors(colors.data);
        setAdditionalEquipments(equipments.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const carConfigurationData = {
      user: "", // Le userId sera extrait du token JWT
      carModel: selectedCarModel,
      engine: selectedEngine,
      color: selectedColor,
      additionalEquipments: selectedAdditionalEquipments,
      totalPrice: totalPrice,
      status: "en cours", // ou récupéré dynamiquement
    };

    try {
      // Récupérer l'ID de l'utilisateur depuis le token JWT
      const token = localStorage.getItem("token"); // Si tu stockes le token dans localStorage
      if (token) {
        const response = await axios.post("/api/carconfigurations", carConfigurationData, {
          headers: { Authorization: `Bearer ${token}` }, // Envoi du token JWT dans l'en-tête
        });
        console.log("Configuration soumise avec succès", response.data);
      } else {
        console.error("Token manquant");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
    }
  };

  return (
    <div>
      <h1>Configuration de voiture</h1>
      <div>
        <label>Choisir le modèle :</label>
        <select onChange={(e) => setSelectedCarModel(e.target.value)} value={selectedCarModel}>
          <option value="">-- Sélectionner un modèle --</option>
          {Array.isArray(carModels) && carModels.length > 0 ? (
            carModels.map((model) => (
              <option key={model._id} value={model._id}>
                {model.name}
              </option>
            ))
          ) : (
            <option>Chargement...</option>
          )}
        </select>
      </div>

      <div>
        <label>Choisir le moteur :</label>
        <select onChange={(e) => setSelectedEngine(e.target.value)} value={selectedEngine}>
          <option value="">-- Sélectionner un moteur --</option>
          {Array.isArray(engines) && engines.length > 0 ? (
            engines.map((engine) => (
              <option key={engine._id} value={engine._id}>
                {engine.name}
              </option>
            ))
          ) : (
            <option>Chargement...</option>
          )}
        </select>
      </div>

      <div>
        <label>Choisir la couleur :</label>
        <select onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
          <option value="">-- Sélectionner une couleur --</option>
          {Array.isArray(colors) && colors.length > 0 ? (
            colors.map((color) => (
              <option key={color._id} value={color._id}>
                {color.name}
              </option>
            ))
          ) : (
            <option>Chargement...</option>
          )}
        </select>
      </div>

      <div>
        <label>Choisir des équipements supplémentaires :</label>
        {Array.isArray(additionalEquipments) && additionalEquipments.length > 0 ? (
          additionalEquipments.map((equipment) => (
            <label key={equipment._id}>
              <input
                type="checkbox"
                value={equipment._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAdditionalEquipments((prev) => [...prev, e.target.value]);
                  } else {
                    setSelectedAdditionalEquipments((prev) =>
                      prev.filter((item) => item !== e.target.value)
                    );
                  }
                }}
              />
              {equipment.name}
            </label>
          ))
        ) : (
          <p>Chargement...</p>
        )}
      </div>

      <div>
        <label>Prix Total :</label>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
        />
      </div>

      <button onClick={handleSubmit}>Soumettre</button>
    </div>
  );
};

export default ConfigurationForm;
