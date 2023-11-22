<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

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
if (!isset($_POST["selectedRole"])) {
    sendResponse(false, "Role is required");
}

$email = $_POST["email"];
$password = md5($_POST["password"]);
$role = $_POST["selectedRole"];

$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email AND password = :password AND user_types = :role";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);
$stmt->bindParam("role", $role, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() == 0) {
    sendResponse(false, "Email or Password is incorrect!");
}

$token = generateToken($pdo);
$query = "UPDATE users SET token = :token WHERE email = :email AND password = :password AND user_types = :role";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);
$stmt->bindParam("role", $role, PDO::PARAM_STR);    
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(true, "Successfully Logged In", ["token" => $token]);
}

sendResponse(false, "Can't Login, Please try again!");
