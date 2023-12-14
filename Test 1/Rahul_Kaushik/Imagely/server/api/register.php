<?php

require("./utils/functions.php");

if (!$_SERVER["REQUEST_METHOD"] == "POST") {
    sendResponse(false, "Invalid request method");
} else {
  if (empty($_POST["user_name"])) {
    $nameErr = "Name is required";
    sendResponse(false, $nameErr);
  } else {
    $name = test_input($_POST["name"]);
    if (!preg_match("/^[a-zA-Z-' ]*$/", $name)) {
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



}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$user_name = $_POST["user_name"];
$email = $_POST["email"];
$password = md5($_POST["password"]);


$pdo = connect();

$query = "SELECT * FROM useraccounts WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
    header("Location: ../../client/index.html");
}


$query = "INSERT INTO useraccounts (user_name, email, password) VALUES (:user_name, :email, :password)";

$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_name", $user_name, PDO::PARAM_STR);
$stmt->bindParam(":email", $email, PDO::PARAM_STR);
$stmt->bindParam(":password", $password, PDO::PARAM_STR);


$stmt->execute();
if ($stmt->rowCount() > 0) {
    // sendResponse(true, "Registered Successfully");
    header("Location: ../../client/index.html");
    exit;
}else{
    sendResponse(false, "User registration failed");
}
?>