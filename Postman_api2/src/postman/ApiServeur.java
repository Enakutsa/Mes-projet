package postman;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.stream.Collectors;

public class ApiServeur {

    public static void main(String[] args) {
        try {
            // Création du serveur HTTP
            HttpServer server = HttpServer.create(new InetSocketAddress(9000), 0);

            // Définition des points d'accès (routes)
            server.createContext("/addUser", new AddDataHandler()); // Modifié pour addUser
            server.createContext("/getUsers", new GetDataHandler()); // Modifié pour getUsers
            server.createContext("/updateUser", new UpdateDataHandler()); // Modifié pour updateUser
            server.createContext("/deleteUser", new DeleteDataHandler()); // Modifié pour deleteUser

            server.setExecutor(null); // Exécuteur par défaut
            System.out.println("Serveur lancé sur le port 9000...");
            server.start();
        } catch (IOException e) {
            System.err.println("Erreur : Impossible de créer ou démarrer le serveur HTTP.");
            e.printStackTrace();
        }
    }

    // Gestion des requêtes POST pour ajouter un utilisateur
    static class AddDataHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    String body = getRequestBody(exchange);
                    JsonObject json = new Gson().fromJson(body, JsonObject.class);

                    if (!json.has("type") || !"user".equalsIgnoreCase(json.get("type").getAsString())) {
                        sendResponse(exchange, 400, "Erreur : Type invalide ou manquant. Seul 'user' est accepté.");
                        return;
                    }

                    boolean success = false;
                    try (Connection conn = getDatabaseConnection()) {
                        String query = "INSERT INTO users (name, prenom, age, email) VALUES (?, ?, ?, ?)";
                        PreparedStatement stmt = conn.prepareStatement(query);
                        stmt.setString(1, json.get("name").getAsString());
                        stmt.setString(2, json.get("prenom").getAsString());
                        stmt.setInt(3, json.get("age").getAsInt());
                        stmt.setString(4, json.get("email").getAsString());
                        success = stmt.executeUpdate() > 0;
                    }

                    sendResponse(exchange, success ? 200 : 500, success ? "Utilisateur ajouté avec succès !" : "Erreur lors de l'ajout.");
                } catch (Exception e) {
                    e.printStackTrace();
                    sendResponse(exchange, 500, "Erreur interne du serveur.");
                }
            } else {
                sendMethodNotAllowedResponse(exchange);
            }
        }
    }

    // Gestion des requêtes GET pour récupérer des utilisateurs
    static class GetDataHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                try (Connection conn = getDatabaseConnection()) {
                    String query = "SELECT * FROM users";
                    PreparedStatement stmt = conn.prepareStatement(query);
                    ResultSet rs = stmt.executeQuery();

                    StringBuilder response = new StringBuilder("[");
                    while (rs.next()) {
                        response.append("{")
                                .append("\"name\":\"").append(rs.getString("name")).append("\",")
                                .append("\"prenom\":\"").append(rs.getString("prenom")).append("\",")
                                .append("\"age\":").append(rs.getInt("age")).append(",")  // Age avant email
                                .append("\"email\":\"").append(rs.getString("email")).append("\"")
                                .append("},");
                    }
                    if (response.length() > 1) response.deleteCharAt(response.length() - 1);
                    response.append("]");

                    sendResponse(exchange, 200, response.toString());
                } catch (Exception e) {
                    e.printStackTrace();
                    sendResponse(exchange, 500, "Erreur interne lors de la récupération des données.");
                }
            } else {
                sendMethodNotAllowedResponse(exchange);
            }
        }
    }

    // Gestion des requêtes PUT pour mettre à jour un utilisateur
    static class UpdateDataHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("PUT".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    String body = getRequestBody(exchange);
                    JsonObject json = new Gson().fromJson(body, JsonObject.class);

                    if (!json.has("type") || !"user".equalsIgnoreCase(json.get("type").getAsString()) || !json.has("id")) {
                        sendResponse(exchange, 400, "Erreur : Type ou ID manquant dans la requête.");
                        return;
                    }

                    boolean success = false;
                    try (Connection conn = getDatabaseConnection()) {
                        String query = "UPDATE users SET name = ?, prenom = ?, age = ?, email = ? WHERE id = ?";
                        PreparedStatement stmt = conn.prepareStatement(query);
                        stmt.setString(1, json.get("name").getAsString());
                        stmt.setString(2, json.get("prenom").getAsString());
                        stmt.setInt(3, json.get("age").getAsInt());
                        stmt.setString(4, json.get("email").getAsString());
                        stmt.setInt(5, json.get("id").getAsInt());
                        success = stmt.executeUpdate() > 0;
                    }

                    sendResponse(exchange, success ? 200 : 500, success ? "Mise à jour réussie !" : "Erreur lors de la mise à jour.");
                } catch (Exception e) {
                    e.printStackTrace();
                    sendResponse(exchange, 500, "Erreur interne du serveur.");
                }
            } else {
                sendMethodNotAllowedResponse(exchange);
            }
        }
    }

    // Gestion des requêtes DELETE pour supprimer un utilisateur
    static class DeleteDataHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("DELETE".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    String body = getRequestBody(exchange);
                    JsonObject json = new Gson().fromJson(body, JsonObject.class);

                    if (!json.has("type") || !"user".equalsIgnoreCase(json.get("type").getAsString()) || !json.has("id")) {
                        sendResponse(exchange, 400, "Erreur : Type ou ID manquant dans la requête.");
                        return;
                    }

                    boolean success = false;
                    try (Connection conn = getDatabaseConnection()) {
                        String query = "DELETE FROM users WHERE id = ?";
                        PreparedStatement stmt = conn.prepareStatement(query);
                        stmt.setInt(1, json.get("id").getAsInt());
                        success = stmt.executeUpdate() > 0;
                    }

                    sendResponse(exchange, success ? 200 : 500, success ? "Utilisateur supprimé avec succès !" : "Erreur lors de la suppression.");
                } catch (Exception e) {
                    e.printStackTrace();
                    sendResponse(exchange, 500, "Erreur interne du serveur.");
                }
            } else {
                sendMethodNotAllowedResponse(exchange);
            }
        }
    }

    // Méthodes utilitaires
    private static Connection getDatabaseConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/ma_base";
        String username = "root";
        String password = "";
        return DriverManager.getConnection(url, username, password);
    }

    private static String getRequestBody(HttpExchange exchange) throws IOException {
        InputStream is = exchange.getRequestBody();
        return new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))
                .lines().collect(Collectors.joining("\n"));
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.getBytes(StandardCharsets.UTF_8).length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes(StandardCharsets.UTF_8));
        os.close();
    }

    private static void sendMethodNotAllowedResponse(HttpExchange exchange) throws IOException {
        sendResponse(exchange, 405, "Méthode HTTP non supportée.");
    }
}