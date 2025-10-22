const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Exemple de base de données de produits
let products = [
    { id: 1, name: 'Produit 1', price: 20, imageUrl: 'product1.jpg' },
    { id: 2, name: 'Produit 2', price: 30, imageUrl: 'product2.jpg' },
    { id: 3, name: 'Produit 3', price: 40, imageUrl: 'product3.jpg' },
];

// Route pour obtenir les produits
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route pour ajouter un produit au panier (simulation)
app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    console.log(`Produit ID: ${productId}, Quantité: ${quantity}`);
    res.status(200).send('Produit ajouté au panier');
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
