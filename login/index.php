<?php
// login.php

// Remplacer ces valeurs par les informations d'identification correctes
$correct_username = "admin";
$correct_password = "password123";

// Récupérer les données du formulaire
$username = $_POST['username'];
$password = $_POST['password'];

// Vérifier les informations d'identification
if ($username === 'junior' && $password === '2002') {
    echo "Connexion réussie ! Bienvenue, " . htmlspecialchars($username) . ".";
    // Rediriger vers une page protégée ou afficher le contenu protégé
} else {
    echo "Nom d'utilisateur ou mot de passe incorrect.";
}
?>
