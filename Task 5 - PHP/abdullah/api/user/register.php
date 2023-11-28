<?php

require("../utils/functions.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
    exit();
}

if (!isset($_POST["name"])) {
    sendResponse(false, "Name is required");
}
if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["phoneNo"])) {
    sendResponse(false, "Phone number is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}

$name = $_POST["name"];
$email = $_POST["email"];
$phoneNo = $_POST["phoneNo"];
$password = password_hash($_POST["password"], PASSWORD_BCRYPT);
if (strlen($email) < 3 || strlen($email) > 30) {
    sendResponse(false, "Email must be between 3 and 30 characters");
}

$pdo = connect();

try {
    $query = 'INSERT INTO customer (name, mobile_no, email, password) VALUES (:name, :phone , :email, :password)';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam("name", $name, PDO::PARAM_STR);
    $stmt->bindParam("email", $email, PDO::PARAM_STR);
    $stmt->bindParam("phone", $phoneNo, PDO::PARAM_STR);
    $stmt->bindParam("password", $password, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Registered Successfully");
    } else {
        sendResponse(false, "User registration failed");
    }
} catch (PDOException $e) {
    sendResponse(false, "Database error: " . $e->getMessage());
}
