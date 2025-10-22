package postman;

public class Main {
    public static void main(String[] args) {
        // Test de connexion
        Connexion.getConnection();
        
        // Fermer la connexion après test
        Connexion.closeConnection();
    }
}
