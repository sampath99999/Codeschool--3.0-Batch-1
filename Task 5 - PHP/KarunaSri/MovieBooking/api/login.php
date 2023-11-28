<?php

require("./utils/functions.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user input
    $email = $_POST['email'];
    // $hashedpassword = connect($email);
    $password = md5($_POST['password']);


    $pdo = connect();
    $query = "SELECT * FROM users WHERE email = :email AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        sendResponse(false, "Email or Password is incorrect!");
    }

    $token = generateToken($pdo);
    $query = "UPDATE users SET token = :token WHERE email = :email AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam("token", $token, PDO::PARAM_STR);
    $stmt->bindParam("email", $email, PDO::PARAM_STR);
    $stmt->bindParam("password", $password, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, " You are Successfully Logged In", ["token" => $token]);
    }

    sendResponse(false, "Can't Login, Please try again!");
}
    // $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // echo '<script> alert ($password);</script>';

    // if (password_verify($password, $user['password'])) {

    //     echo '<script> alert ("Your are entering into movies.");</script>';
    //     header("location:../index.html;");
    // } else {
    //     echo '<script> alert ("Invalid credentials");</script>';
    //     // echo '<script>window.location.href="login.php";</script>';
    // }
