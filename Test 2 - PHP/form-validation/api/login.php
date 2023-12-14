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

$query = "SELECT * FROM validForm WHERE email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() == 0) {
    sendResponse(false, "Email or Password is incorrect!");
}

$query = "SELECT user_type FROM validForm WHERE email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':password', $password, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Debug information


if ($result) {
    $userType = $result['user_type'];

    $token = generateToken($pdo);

    $query = "UPDATE validForm SET token = :token, user_type = :user_type WHERE email = :email AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $token, PDO::PARAM_STR);
    $stmt->bindParam(":user_type", $userType, PDO::PARAM_INT);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":password", $password, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "", ["token" => $token, "user_type" => $userType]);
    } else {
        sendResponse(false, "Can't Login, Please try again!");
    }
} else {
    sendResponse(false, "Can't Login, Please try again!");
}
