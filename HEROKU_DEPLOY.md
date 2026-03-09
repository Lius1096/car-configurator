# Deployment Guide - Heroku

Ce guide explique comment déployer le Car Configurator sur Heroku.

## Prérequis

1. **Compte Heroku** - Créez un compte sur [heroku.com](https://www.heroku.com)
2. **Heroku CLI** - Installez depuis [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **MongoDB Atlas** - Créez un cluster cloud sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
4. **Git** - Assurez-vous que le projet est un repo Git

## Étapes de déploiement

### 1. Préparer MongoDB Atlas

1. Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Créez un utilisateur de base de données
4. Copiez la connection string (ressemble à: `mongodb+srv://user:pass@cluster.mongodb.net/carconfig?retryWrites=true&w=majority`)

### 2. Créer l'app Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Remplacez "your-app-name" par le nom que vous voulez
```

### 3. Configurer les variables d'environnement

```bash
# Définissez les variables Heroku
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/carconfig?retryWrites=true&w=majority" --app your-app-name

heroku config:set NODE_ENV="production" --app your-app-name

heroku config:set PORT="5000" --app your-app-name
```

### 4. Déployer l'app

```bash
# Push vers Heroku
git push heroku main

# Ou si votre branche principale s'appelle "master"
git push heroku master
```

### 5. Vérifier le déploiement

```bash
# Voir les logs
heroku logs --tail --app your-app-name

# Ouvrir l'app dans le navigateur
heroku open --app your-app-name
```

## Structure du déploiement

- **root `package.json`** - Orchestrer les builds backend/frontend
- **`Procfile`** - Instructions de démarrage pour Heroku
- **`backend/src/main.ts`** - Serve le frontend compilé
- **`.env.example`** - Variables d'environnement

## Variables d'environnement Heroku

| Variable | Valeur | Notes |
|----------|--------|-------|
| `MONGODB_URI` | `mongodb+srv://...` | Connection string MongoDB Atlas |
| `NODE_ENV` | `production` | Mode production |
| `PORT` | `5000` | Port de l'app |

## Architecture du déploiement

```
Heroku Dyno (5000)
├── NestJS Backend (/api/*)
│   ├── MongoDB Atlas
│   └── Gère les API
└── Frontend compilé (*)
    └── Servi par NestJS
```

## Troubleshooting

### Erreur: "Cannot find module"
```bash
# Nettoyer et redéployer
rm -rf backend/node_modules backend/dist frontend/node_modules
git add -A
git commit -m "clean"
git push heroku main
```

### Erreur: "Port is already in use"
Heroku assigne automatiquement le PORT. Ne hardcodez pas le port.

### MongoDB Connection Error
- Vérifiez que l'IP est autorisée dans MongoDB Atlas (permettre 0.0.0.0/0)
- Vérifiez la connection string
- Testez en local d'abord avec le même MONGODB_URI

### Frontend ne charge pas
Vérifiez que :
- `frontend/dist/` existe après le build
- `backend/src/main.ts` sert bien les fichiers statiques
- Les logs Heroku montrent le path correct

## Mise à jour de l'app

```bash
# Faire des changements locaux
git add -A
git commit -m "description"

# Redéployer
git push heroku main
```

## Commandes utiles Heroku

```bash
# Voir les logs en temps réel
heroku logs --tail

# Voir les variables d'environnement
heroku config

# Redémarrer l'app
heroku restart

# Voir le status
heroku status
```

## Coûts

- **Heroku**: $5-50/mois (selon la taille des dynos)
- **MongoDB Atlas**: Gratuit pour 512MB, puis $9+/mois
- **Total minimum**: ~$14/mois

## Support

Pour des problèmes:
- Vérifiez les logs: `heroku logs --tail`
- Vérifiez la connection MongoDB
- Assurez-vous que le build fonctionne localement d'abord
