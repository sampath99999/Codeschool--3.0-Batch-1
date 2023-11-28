<?php

require("./utils/functions.php");

if (!$_SERVER["REQUEST_METHOD"] == "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["username"])) {
    sendResponse(false, "UserName is required");
}

if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["phone"])) {
    sendResponse(false, "Phone Number is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}



$username = $_POST["username"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$password = md5($_POST["password"]);

//Validate Name
if (!preg_match("/^[a-zA-Z_' ]*$/", $username)) {
    echo "Name must be alphabets only";
    exit;
}
// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email address.";
    exit;
}
//Validate Phone Number
if (empty($phone)) {
    echo "Invalid Phone NUmmber";
    exit;
}

// Validate password
if (empty($password) || strlen($password) < 9) {
    echo "Password ";
    exit;
}


$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}

try {
    $query = "INSERT INTO users(username, email, user_phone_no, password) VALUES (:username, :email,:phone, :password)";

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":phone", $phone, PDO::PARAM_INT);
    $stmt->bindParam(":password", $password, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Registered Successfully");
        // echo "Registered Successfully";
        // echo '<script> alert ("Account created");</script>';
        // echo '<script>window.location.href="../login.html";</script>';
    }
} catch (PDOException $e) {
    sendResponse(false, "User registration failed");
    // echo '<script> alert ("Account already exists!");</script>';
    // echo '<script>window.location.href="login.php";</script>';
}
