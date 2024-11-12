<?php
// Database configuration
$host = 'tourmini.crmeuigq8tij.eu-north-1.rds.amazonaws.com'; // Example: your-db-instance.abc123xyz.us-west-1.rds.amazonaws.com
$dbname = 'tourminid';
$username = 'admin';
$password = 'Mayuri0911';

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user = $_POST['username'];
        $pass = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashing the password
        $email = $_POST['email'];

        // Prepare the SQL statement
        $stmt = $pdo->prepare("INSERT INTO users (username, password, email) VALUES (:username, :password, :email)");

        // Bind parameters
        $stmt->bindParam(':username', $user);
        $stmt->bindParam(':password', $pass);
        $stmt->bindParam(':email', $email);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Registration failed. Please try again.";
        }
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
