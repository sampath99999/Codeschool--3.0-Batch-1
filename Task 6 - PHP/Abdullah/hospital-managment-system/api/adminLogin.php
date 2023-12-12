<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}

$pdo = connect();
$email = $_POST["email"];
$password = $_POST["password"];

$query = "SELECT * FROM admin WHERE email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":email", $email, PDO::PARAM_STR);
$stmt->bindParam(":password", $password, PDO::PARAM_STR);

$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($stmt->rowCount() == 0) {
    sendResponse(false, "Email or Password is incorrect!");
}

if ($stmt->rowCount() == 1) {
    $token = generateToken($pdo);

    $updateTokenQuery = "UPDATE admin SET token = :token WHERE email = :email";
    $stmtUpdateToken = $pdo->prepare($updateTokenQuery);
    $stmtUpdateToken->bindParam(":token", $token, PDO::PARAM_STR);
    $stmtUpdateToken->bindParam(":email", $email, PDO::PARAM_STR);
    $stmtUpdateToken->execute();

    $getUserIdQuery = "SELECT id, name FROM admin WHERE token = :token";
    $stmtGetUserId = $pdo->prepare($getUserIdQuery);
    $stmtGetUserId->bindParam(":token", $token, PDO::PARAM_STR);
    $stmtGetUserId->execute();
    $adminData = $stmtGetUserId->fetch(PDO::FETCH_ASSOC);

    if ($stmtUpdateToken->rowCount() > 0) {
        sendResponse(true, "Successfully Logged In", [
            "token" => $token,
            "admin_id" => $adminData["id"],
            "admin_name" => $adminData["name"]
        ]);
    } else {
        sendResponse(false, "Can't Login, Please try again!");
    }
}
