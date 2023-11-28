<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}

$email = $_POST["email"];
$password = md5($_POST["password"]);

$pdo = connect();

$query = "SELECT * FROM registers WHERE  email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() == 0) {
    sendResponse(false, "Email or Password is incorrect!");
}

$tokens = generateToken($pdo);
$query = "UPDATE registers SET tokens = :tokens WHERE email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam("tokens", $tokens, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(true, "", ["tokens" => $tokens]);
}

sendResponse(false, "Can't Login, Please try again!");