<?php

require("./utils/functions.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    echo "$email";
    echo "$password";
    // connect to the database
    $pdo = connect();

    //query, preparing it and binding the params
    //Then executing the query stmt
    $query = 'SELECT * FROM admin_login WHERE admin_email = :email AND password = :password';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        sendResponse(false, "Email or Password is incorrect!");
    }

    $token = generateToken($pdo);
    $query = "UPDATE admin_login SET token = :token WHERE admin_email = :email AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $token, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":password", $password, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Successfully Logged In", ["token" => $token]);
    }

    sendResponse(false, "Can't Login, Please try again!");
}
