<?php
$servername = "localhost";
$username = "root"; // Modifier selon ton serveur
$password = "";
$dbname = "fastfood";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

// Récupération des données du formulaire
$nom_client = $_POST['name'];
$plat = $_POST['meal'];
$quantite = $_POST['quantity'];

// Récupérer le prix du plat
$sql = "SELECT id, prix FROM plats WHERE nom = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $plat);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $plat_id = $row['id'];
    $prix = $row['prix'];
    $total = $prix * $quantite;

    // Insérer la commande
    $sql = "INSERT INTO commandes (nom_client, plat_id, quantite, total) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sidd", $nom_client, $plat_id, $quantite, $total);
    
    if ($stmt->execute()) {
        echo "Commande enregistrée avec succès.";
    } else {
        echo "Erreur: " . $conn->error;
    }
} else {
    echo "Plat non trouvé.";
}

$conn->close();
?>