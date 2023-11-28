
<?php

require("./utils/connection.php"); 

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["fullname"])) {
    sendResponse(false, "Name is required");
}
else {
    $name = test_input($_POST["fullname"]);
  }
if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
} else {
    $email = test_input($_POST["email"]);
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

$name = $_POST["fullname"];
$email = $_POST["email"];
$password = md5($_POST["password"]);
$dob=$_POST["dob"];
$gender=$_POST["gender"];

// if (strlen($name) < 3 || strlen($email) > 25) {
//  sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
// }

$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email or Number already exists");
}


$query = "INSERT INTO users ( username, email, password,dob,gender) VALUES (:name, :email, :password,:dob,:gender)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("name", $name, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);
$stmt->bindParam("dob", $dob, PDO::PARAM_STR);
$stmt->bindParam("gender", $gender, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");
