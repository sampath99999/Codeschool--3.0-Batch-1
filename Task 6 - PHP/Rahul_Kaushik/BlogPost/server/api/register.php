<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"]=="POST"){
    sendResponse(false, "Invalid Request Method");
}else{
    if (empty($_POST["username"])) {
        $nameErr = "Name is required";
        sendResponse(false, $nameErr);
    } else {
        $username = test_input($_POST["username"]);
        if (!preg_match("/^[a-zA-Z-' ]*$/", $username)) {
            $nameErr = "Only letters and white space allowed";
            sendResponse(false, $nameErr);
        }
    }

    if (empty($_POST["email"])) {
        $emailErr = "Email is required";
        sendResponse(false, $emailErr);
    } else {
        $email = test_input($_POST["email"]);
        if (!preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/", $email)) {
            $emailErr = "Invalid email format";
            sendResponse(false, $emailErr);
        }
    }

    if (empty($_POST["password"])) {
        $passwordErr = "Password is required";
        sendResponse(false, $passwordErr);
    } else {
        $password = test_input($_POST["password"]);
        if (!preg_match("/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}/", $password)) {
            $passwordErr = "Password must have 8 char at least 1 special char, lowercase, uppercase char and digit";
            sendResponse(false, $passwordErr);
        }
    }

    if (empty($_POST["role"])) {
        $roleErr = "Role Required";
        sendResponse(false, $roleErr);
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$username = $_POST["username"];
$email = $_POST["email"];
$password = md5($_POST["password"]);
$role = $_POST["role"];

$pdo = connect();

$query = "SELECT * FROM users WHERE user_email = :user_email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("user_email", $email, PDO::PARAM_STR);
$stmt->execute();

if($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}

$query = "INSERT INTO users(user_name, user_email, user_password, user_role) values(:user_name, :user_email,:user_password, :user_role)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_name", $username, PDO::PARAM_STR);
$stmt->bindParam(":user_email", $email, PDO::PARAM_STR);
$stmt->bindParam(":user_password", $password, PDO::PARAM_STR);
$stmt->bindParam(":user_role", $role, PDO::PARAM_INT);
$stmt->execute();

if($stmt->rowCount() > 0) {
    sendResponse(true, "Registration Successful");
}else{
    sendResponse(false,"Registration Failed");
}


?>