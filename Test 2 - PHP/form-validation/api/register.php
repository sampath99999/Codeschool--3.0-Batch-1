<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["name"])) {
    sendResponse(false, "Name is required");
}
if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}

$name = $_POST["name"];
$email = $_POST["email"];
$password = md5($_POST["password"]);

if (strlen($name) < 3) {
    sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
}

if (strlen($email) < 3) {
    sendResponse(false, "Email must be at least 3 characters and at most 25 characters");
}
$password = $_POST['password'];

$password_pattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/";

if (strlen($password) < 8 || !preg_match($password_pattern, $password)) {
    sendResponse(false, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character.");
}


$pdo = connect();

$query = "SELECT * FROM validForm WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}


$query = "INSERT INTO validForm (name, email, password) VALUES (:name, :email, :password)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("name", $name, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");