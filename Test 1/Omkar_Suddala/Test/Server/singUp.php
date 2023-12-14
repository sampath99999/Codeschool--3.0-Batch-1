
<?php

require("./utils/connection.php"); 

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["fullName"])) {
    sendResponse(false, "Name is required");
}
else {
    $name = test_input($_POST["fullName"]);
  }
if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
} else {
    $email = test_input($_POST["email"]);
   }
if (!isset($_POST["gender"])) {
    sendResponse(false, "Gender is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

$fullName = $_POST["fullName"];
$email = $_POST["email"];
$password = md5($_POST["password"]);
$gender=$_POST["gender"];

$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email or Number already exists");
}


$query = "INSERT INTO users ( fullname, email,gender, password) VALUES (:fullName,:email,:gender,:password)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("fullName", $fullName, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("gender", $gender, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);


$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");
