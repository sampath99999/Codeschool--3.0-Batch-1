<?php

require("../utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(false, "Invalid request method");
}


$fullName = isset($_POST["fullName"]) ? $_POST["fullName"] : "";
$email = isset($_POST["email"]) ? $_POST["email"] : "";
$phone = isset($_POST["phone"]) ? $_POST["phone"] : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";
$selectedAmount = isset($_POST["selectedAmount"]) ? $_POST["selectedAmount"] : "";
$dedicationText = isset($_POST["dedicationText"]) ? $_POST["dedicationText"] : "";
$writeComment = isset($_POST["writeComment"]) ? $_POST["writeComment"] : "";
$cardNumber = isset($_POST["cardNumber"]) ? $_POST["cardNumber"] : "";
$expirationDate = isset($_POST["expirationDate"]) ? $_POST["expirationDate"] : "";
$cvv = isset($_POST["cvv"]) ? $_POST["cvv"] : "";
$ifscCode = isset($_POST["ifscCode"]) ? $_POST["ifscCode"] : "";

$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":email", $email, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}

$query = "INSERT INTO users (full_name, email, phone, password, selected_amount, dedication_text, write_comment, card_number, expiration_date, cvv, ifsc_code) 
          VALUES (:fullName, :email, :phone, :password, :selectedAmount, :dedicationText, :writeComment, :cardNumber, :expirationDate, :cvv, :ifscCode)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":fullName", $fullName, PDO::PARAM_STR);
$stmt->bindParam(":email", $email, PDO::PARAM_STR);
$stmt->bindParam(":phone", $phone, PDO::PARAM_STR);
$stmt->bindParam(":password", md5($password), PDO::PARAM_STR); 
$stmt->bindParam(":selectedAmount", $selectedAmount, PDO::PARAM_STR);
$stmt->bindParam(":dedicationText", $dedicationText, PDO::PARAM_STR);
$stmt->bindParam(":writeComment", $writeComment, PDO::PARAM_STR);
$stmt->bindParam(":cardNumber", $cardNumber, PDO::PARAM_STR);
$stmt->bindParam(":expirationDate", $expirationDate, PDO::PARAM_STR);
$stmt->bindParam(":cvv", $cvv, PDO::PARAM_STR);
$stmt->bindParam(":ifscCode", $ifscCode, PDO::PARAM_STR);

$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");
?>
