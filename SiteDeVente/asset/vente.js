document.addEventListener('DOMContentLoaded', () => {
    // Animation sur le bouton "Voir nos produits"
    const ctaBtn = document.getElementById('cta-btn');
    
    ctaBtn.addEventListener('click', () => {
        // Faire défiler la page jusqu'à la section des produits
        const produitsSection = document.getElementById('produits');
        produitsSection.scrollIntoView({ behavior: 'smooth' });
    });
});

//// js de produit
document.addEventListener('DOMContentLoaded', () => {
    const panier = []; // Panier vide au départ
    const btnsAjouterPanier = document.querySelectorAll('.btn-ajouter-panier');
    const listePanier = document.getElementById('liste-panier');
    const totalPanier = document.getElementById('total-panier');
    
    // Fonction pour ajouter un produit au panier
    const ajouterAuPanier = (produit, prix) => {
        panier.push({ produit, prix });
        
        // Mise à jour de l'affichage du panier
        afficherPanier();
    };

    // Fonction pour afficher les articles du panier et le total
    const afficherPanier = () => {
        // Réinitialisation de la liste
        listePanier.innerHTML = '';
        
        let total = 0;
        
        panier.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.produit} - ${item.prix}f`;
            listePanier.appendChild(li);
            total += item.prix;
        });

        // Mise à jour du total
        totalPanier.textContent = `Total : ${total}f`;
    };

    // Ajouter un événement sur chaque bouton "Ajouter au panier"
    btnsAjouterPanier.forEach(button => {
        button.addEventListener('click', () => {
            const produit = button.getAttribute('data-produit');
            const prix = parseFloat(button.getAttribute('data-prix'));

            ajouterAuPanier(produit, prix);
        });
    });

    // Fonction pour simuler la commande
    const boutonCommander = document.getElementById('commander-btn');
    boutonCommander.addEventListener('click', () => {
        if (panier.length === 0) {
            alert("Votre panier est vide !");
        } else {
            alert("Commande passée avec succès !");
            // Réinitialiser le panier après la commande
            panier.length = 0;
            afficherPanier();
        }
    });
});

//js pour les contact


document.addEventListener('DOMContentLoaded', () => {
    const formContact = document.getElementById('form-contact');
    const confirmationMessage = document.getElementById('confirmation');

    // Animation du formulaire (affichage avec fade-in)
    formContact.style.animation = 'fadeIn 1s forwards';

    formContact.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche la soumission réelle du formulaire

        // Simulation de la soumission
        setTimeout(() => {
            // Afficher le message de confirmation
            confirmationMessage.style.display = 'block';

            // Réinitialiser le formulaire après quelques secondes
            formContact.reset();

            // Cache le message de confirmation après 5 secondes
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 5000);
        }, 500);
    });
});


//js pour la localisation

function initMap() {
    // Coordonnées de l'endroit où tu veux placer le marqueur
    const position = { lat: 48.8566, lng: 2.3522 };  // Exemple: Paris

    // Créer la carte
    const map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 14, // Niveau de zoom
        disableDefaultUI: true, // Désactive les contrôles par défaut
        scrollwheel: false, // Désactive le zoom avec la molette
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            }
        ]
    });

    // Ajouter un marqueur
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Notre emplacement"
    });
}



//commande recu

 // ID de l'utilisateur actuel (par exemple récupéré depuis le sessionStorage ou un cookie)
 const userId = 1; // Exemple d'ID d'utilisateur, vous pouvez le récupérer dynamiquement

 // Fonction pour récupérer les commandes de l'utilisateur
 async function getOrders(userId) {
   try {
     // Appel API pour récupérer les commandes de l'utilisateur
     const response = await fetch(`http://localhost:3000/orders/${userId}`);
     
     if (!response.ok) {
       throw new Error('Erreur de récupération des commandes');
     }

     // Convertir la réponse en JSON
     const orders = await response.json();

     // Sélectionner l'élément HTML où les commandes seront affichées
     const ordersList = document.getElementById('orders-list');
     
     // Si aucune commande, afficher un message
     if (orders.length === 0) {
       ordersList.innerHTML = '<li>Aucune commande trouvée</li>';
       return;
     }

     // Parcourir et afficher les commandes
     orders.forEach(order => {
       const listItem = document.createElement('li');
       listItem.textContent = `Commande #${order.id} - ${order.status} - Total: ${order.total}€`;
       ordersList.appendChild(listItem);
     });

   } catch (error) {
     console.error('Erreur lors de la récupération des commandes:', error);
   }
 }

 // Appeler la fonction pour afficher les commandes de l'utilisateur
 getOrders(userId);



 //recuperation des commande

 
 
 const express = require('express');
 const mysql = require('mysql2');
 
 
 const nodemailer = require('nodemailer');
 const app = express();
 const port = 3000;
 
 // Configurer le transporteur d'email avec Nodemailer
 
 
 const transporter = nodemailer.createTransport({
   
   
 service: 'gmail',  // Utilisez un autre service d'email si nécessaire
   auth: {
     
     
 user: 'your-email@gmail.com',  // Remplacez par votre email
     
     
 pass: 'your-email-password',   // Remplacez par votre mot de passe ou un app password
   },
 });
 
 
   
 // Connexion à la base de données MySQL
 const db = mysql.createConnection({
   
   
 host: 'localhost',
   

 user: 'root',  // Remplacez par votre utilisateur MySQL
   password: '',  // Remplacez par votre mot de passe MySQL
   

 database: 'ecommerce',
 });
 
 