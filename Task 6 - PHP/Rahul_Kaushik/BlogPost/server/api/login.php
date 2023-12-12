<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false, "Invalid Method Request");
}else{
    if (!isset($_POST["email"])) {
        sendResponse(false, "Email is required");
    }

    if (!isset($_POST["password"])) {
        sendResponse(false, "Password is required");
    }

    if (!isset($_POST["role"])) {
        sendResponse(false, "Role is required");
    }

    $email = $_POST["email"];
    $password = md5($_POST["password"]);
    $role = $_POST["role"];

    $pdo = connect();

    $query = "SELECT * FROM users WHERE user_email = :user_email AND user_password = :user_password AND user_role = :user_role";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":user_email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":user_password", $password, PDO::PARAM_STR);
    $stmt->bindParam(":user_role", $role, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        sendResponse(false, "Email or Password is incorrect!");
    }

    $token = generateToken($pdo);

    $query = "UPDATE users SET token = :token WHERE user_email = :user_email AND user_password = :user_password AND user_role = :user_role"; 
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $token, PDO::PARAM_STR);
    $stmt->bindParam(":user_email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":user_password", $password, PDO::PARAM_STR);
    $stmt->bindParam(":user_role", $role, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Successfully Logged In", ["token" => $token]);
    }
    
    sendResponse(false, "Can't Login, Please try again!");
}

?>