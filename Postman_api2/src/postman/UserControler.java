package postman;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserControler {

    // Ajouter un utilisateur
    public boolean createUser(User user) {
        String query = "INSERT INTO users (name, email) VALUES (?, ?)";
        try (Connection conn = Connexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de l'ajout de l'utilisateur !");
            e.printStackTrace();
            return false;
        }
    }

    // Récupérer un utilisateur par ID
    public User getUserById(int id) {
        String query = "SELECT * FROM users WHERE id = ?";
        try (Connection conn = Connexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new User(rs.getInt("id"), rs.getString("name"), rs.getString("email"));
            }
        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la récupération de l'utilisateur !");
            e.printStackTrace();
        }
        return null;
    }

    // Récupérer tous les utilisateurs
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        String query = "SELECT * FROM users";
        try (Connection conn = Connexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                users.add(new User(rs.getInt("id"), rs.getString("name"), rs.getString("email")));
            }
        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la récupération des utilisateurs !");
            e.printStackTrace();
        }
        return users;
    }

    // Mettre à jour un utilisateur
    public boolean updateUser(User user) {
        String query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        try (Connection conn = Connexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setInt(3, user.getId());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la mise à jour de l'utilisateur !");
            e.printStackTrace();
            return false;
        }
    }

    // Supprimer un utilisateur
    public boolean deleteUser(int id) {
        String query = "DELETE FROM users WHERE id = ?";
        try (Connection conn = Connexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la suppression de l'utilisateur !");
            e.printStackTrace();
            return false;
        }
    }
}