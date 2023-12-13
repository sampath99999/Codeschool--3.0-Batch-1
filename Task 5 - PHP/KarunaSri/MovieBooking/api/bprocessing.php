<?php

require("./utils/functions.php");

$username = "your_username";
$password = "your_password";

$pdo = connect();
// try {
//     $pdo = new PDO($dsn, $username, $password);
// } catch (PDOException $e) {
//     die("Connection failed: " . $e->getMessage());
// }

// Process form data and insert into the database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form data
    $show_id = $_POST["show_id"];
    $user_name = htmlspecialchars($_POST["user_name"]);
    $payment_method = htmlspecialchars($_POST["payment_method"]);

    // Insert booking data into the database
    $stmt = $pdo->prepare("INSERT INTO bookings (show_id, user_name, payment_method) VALUES (?, ?, ?)");
    $stmt->execute([$show_id, $user_name, $payment_method]);

    // Update seat status to booked
    // Add additional logic to update only the selected seats

    header("Location: success_page.php"); // Redirect to a success page
}
