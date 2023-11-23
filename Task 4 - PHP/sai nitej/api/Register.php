<?php

require("./utilites/Connections.php");

if (!$_SERVER["REQUEST_METHOD"] == "POST") {
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

if (strlen($name) < 3 || strlen($name) > 25) {
    sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
}
if (!preg_match("/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/", $email)) {
    sendResponse(false, "Enter a valid email id");
}
if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{8,}$/", $_POST["password"])) {
    sendResponse(false, "Password should at least contain a special character a number and a upper case ");
}


$pdo = connect();

$query = "SELECT * FROM details WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}


$query = "INSERT INTO details (name, email, password) VALUES (:name, :email, :password)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("name", $name, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");