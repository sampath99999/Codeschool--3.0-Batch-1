<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["name"])) {
    sendResponse(false, "Name is required");
}
if (!isset($_POST["mobile"])) {
    sendResponse(false, "Mobile is required");
}
if(!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}

$name = $_POST["name"];
$mobile = $_POST["mobile"];
$email = $_POST["email"];
$password = md5($_POST["password"]);

$pattern = '/^[a-zA-Z0-9]+$/';
if (strlen($name) < 3 || strlen($name) > 25) {
    sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
}
if (!preg_match($pattern, $name)) {
    sendResponse(false, "Special characters are not allowed in the name");
}

// Additional email validation could be added here
if(strlen($email) < 3) {
    sendResponse(false, "Invalid email");
}

// Mobile validation could be added here

// Password validation

if(!$password=="Charan@1234"){
    sendResponse(false, "Invalid");
}

    $pdo = connect();

$query = "SELECT * FROM registers WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":email", $email, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}

$query = "INSERT INTO registers (fullname, email, mobile, password) VALUES (:name, :email, :mobile, :password)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":name", $name, PDO::PARAM_STR);
$stmt->bindParam(":email", $email, PDO::PARAM_STR);
$stmt->bindParam(":mobile", $mobile, PDO::PARAM_STR);
$stmt->bindParam(":password", $password, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");
?>
