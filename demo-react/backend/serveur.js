const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const ProduitRoutes = require('./routes/ProduitRoutes');

dotenv.config(); // on précise que l'on utilise le fichier .env pour les variables d'environnemnt auquel on pourra accéder par la suite avec process.env

const app = express(); // on crée une instance d'express 

app.use(express.json()); // on utilise express.json pour pouvoir envoyer des données en format json
app.use(cors()); // on utilise cors pour pouvoir envoyer des données entre deux serveurs différents



//se connecter a la BDD
mongoose.connect(process.env.MONGO_URI) //connect est une promesse, on utilise then pour récupérer la réponse de la promesse et catch pour récupérer l'erreur si la connexion échoue 
.then(() => console.log('Connexion à la base de données réussie'))
.catch((err) => console.error('Erreur de connexion:', err))

app.use('/api/produits', ProduitRoutes) // on utilise le router pour les routes de produits

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`le serveur fonctionne sur le port ${PORT}`)
})