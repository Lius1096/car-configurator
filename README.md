# CarConfiguration 3D

Une application web de configuration de voiture en 3D avec **React + Three.js** pour le frontend et **NestJS + MongoDB** pour le backend.

---

## 📁 Structure du projet

carconfig/
├─ frontend/ # Frontend React + Vite + Tailwind CLI
│ ├─ src/
│ │ ├─ components/ # Composants React (CarViewer.jsx, App.jsx, etc.)
│ │ └─ styles/ # Input et Output CSS Tailwind
│ ├─ public/models/ # Modèles 3D (.glb)
│ └─ package.json
│
├─ backend/ # Backend NestJS + MongoDB
│ ├─ src/
│ │ └─ modules/cars/ # Module Car avec service, controller et seed.json
│ └─ package.json
│
└─ carconfig.zip # Projet compressé
##

---

## ⚡ Frontend

Le frontend est basé sur :  
- **React 18**  
- **Vite 5**  
- **Three.js** pour la visualisation 3D  
- **TailwindCSS CLI (v4)** pour le styling

### Installation

Depuis le dossier `frontend` :

```bash
npm install
Lancer le projet
Compiler Tailwind en mode watch :

bash
##

---

## 🗄️ Database (MongoDB) — troubleshooting

If you see Mongoose errors like "connect ECONNREFUSED ::1:27017" it means your local MongoDB server isn't running or the connection URL is incorrect.

Options to fix:

- Start MongoDB locally (Windows):
	- If you installed MongoDB Community, run the MongoDB service (Services > start "MongoDB") or run the mongod.exe manually.
- Use Docker (quick):
```powershell
docker run -d --name mongo -p 27017:27017 -v mongodbdata:/data/db mongo:6
```
- Or let the backend use an in-memory DB for development. The backend will automatically fall back to an in-memory MongoDB (mongodb-memory-server) if it cannot connect to the configured MONGODB_URI. This is useful during local development when you don't want to run a full MongoDB instance.

Config location: `backend/.env` — set `MONGODB_URI` to your DB connection string if different from the default `mongodb://localhost:27017/carconfig`.

npx @tailwindcss/cli -i ./src/styles/input.css -o ./src/styles/output.css --watch
Ou via le script npm ajouté :

bash
##
npm run tailwind
Lancer Vite :

bash
##
npm run dev
Le projet sera disponible sur : http://localhost:5173 (ou l’URL indiquée par Vite)

Note: the frontend will call the backend API at the URL defined by the environment variable `VITE_API_URL` (when using Vite). If you don't set it, the app defaults to `http://localhost:3000/api`.

🎨 Backend
Le backend est basé sur :

NestJS 10

MongoDB

Mongoose pour les modèles

API REST disponible à /api/cars

Installation
Depuis le dossier backend :

bash
##
npm install
Lancer le backend
bash
##
npm run start:dev
Le serveur écoute par défaut sur : http://localhost:3000
(Vérifie ou définis la variable PORT dans .env)

Seed de données
Pour remplir la base de données avec des exemples de voitures :

http
##
POST http://localhost:3000/api/cars/seed
Pour récupérer toutes les voitures :

http
##
GET http://localhost:3000/api/cars
📦 Déploiement
Déployer le frontend (Vite) sur un serveur static (Netlify, Vercel…) ou via Docker

Déployer le backend NestJS sur un serveur Node.js (Heroku, Railway…)

Configurer la base de données MongoDB (MongoDB Atlas ou locale)

Mettre à jour la variable d’environnement MONGODB_URI dans backend/.env

⚙️ Commandes utiles
Frontend
Commande	Description
npm install	Installer les dépendances
npm run dev	Lancer Vite en dev
npm run preview	Aperçu build
npm run tailwind	Watch Tailwind CLI

Backend
Commande	Description
npm install	Installer les dépendances
npm run start:dev	Lancer NestJS en dev
npm run build	Compiler TypeScript
npm run start	Lancer le serveur compilé

🔧 Configuration
Frontend
TailwindCSS CLI gère automatiquement output.css à partir de src/styles/input.css

Modèles 3D dans public/models/car.glb

Couleurs et styles via Tailwind + classes utilitaires

Backend
Connexion MongoDB via MONGODB_URI

Module CarsModule avec seed, service et controller

API REST disponible sous /api/cars

💡 Notes
Assurez-vous que MongoDB tourne avant de lancer le backend

Vous pouvez remplacer le modèle 3D par un vrai fichier .glb dans frontend/public/models/

Les couleurs et styles peuvent être modifiés dans input.css

🛠️ Technologies
Frontend: React, Vite, Three.js, TailwindCSS CLI

Backend: NestJS, Mongoose, MongoDB

3D Models: GLTF/GLB

Langages: JavaScript / TypeScript / CSS



---

