
package postman;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Connexion {
    private static final String URL = "jdbc:mysql://localhost:3306/ma_base"; 
    private static final String USER = "root"; 
    private static final String PASSWORD = ""; 

    private static Connection connection = null;

    // Méthode pour établir la connexion
    public static Connection getConnection() {
        if (connection == null) {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver"); // Charge le driver MySQL
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
                System.out.println("✅ Connexion à la base de données réussie !");
            } catch (ClassNotFoundException e) {
                System.out.println("❌ Erreur : Driver MySQL non trouvé !");
                e.printStackTrace();
            } catch (SQLException e) {
                System.out.println("❌ Erreur de connexion à la base de données !");
                e.printStackTrace();
            }
        }
        return connection;
    }

    // Méthode pour fermer la connexion
    public static void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
                connection = null;
                System.out.println("✅ Connexion fermée.");
            } catch (SQLException e) {
                System.out.println("❌ Erreur lors de la fermeture de la connexion !");
                e.printStackTrace();
            }
        }
    }
}
