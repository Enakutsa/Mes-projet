<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // destinataire
    $to = 'votre@email.com';

    // sujet
    $subject = 'Message from Contact Form';

    // headers
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // contenu du message
    $message_content = "
    <html>
    <head>
        <title>Message from Contact Form</title>
    </head>
    <body>
        <h1>New Message</h1>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Message:</strong> $message</p>
    </body>
    </html>";

    // envoi du mail
    mail($to, $subject, $message_content, $headers);

    // redirection après envoi
    header('Location: index.html?success=true');
} else {
    // si le formulaire n'est pas soumis, redirection vers la page de formulaire
    header('Location: index.html');
}
?>