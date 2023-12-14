<?php

require("./utils/functions.php");

if (!$_SERVER["REQUEST_METHOD"] == "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["first_name"])) {
    sendResponse(false, "first_Name is required");
}
if (!isset($_POST["last_name"])) {
    sendResponse(false, "last_Name is required");
}
if (!isset($_POST["phone"])) {
    sendResponse(false, "phone is required");
};
if (!isset($_POST["gender"])) {
    sendResponse(false, "gender is required");
}
if (!isset($_POST["email"])) {
    sendResponse(false, "Email is required");
}
if (!isset($_POST["password"])) {
    sendResponse(false, "Password is required");
}
if (!isset($_POST["confirm"])) {
    sendResponse(false, "please confirm the password");
}
$first_name = $_POST["first_name"];
$last_name = $_POST["last_name"];
$phone = $_POST["phone"];
$gender = $_POST["gender"];
$email = $_POST["email"];
$password = md5($_POST["password"]);
$confirm=$_POST["confirm"];

if (strlen($first_name) < 3 || strlen($first_name) > 25) {
    sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
}
if (strlen($last_name) < 3 || strlen($last_name) > 25) {
    sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
}
if (!preg_match("/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/", $email)) {
    sendResponse(false, "Enter a valid email id");
}
if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{8,}$/", $_POST["password"])) {
    sendResponse(false, "Password should at least contain a special character a number and a upper case ");
}
if( $confirm!=$_POST["password"]){
    sendResponse(false, "the confirm password does not match password");
}

$pdo = connect();

$query = "INSERT INTO user_details (first_name,last_name,phone,gender,email,password,user_type,activity) VALUES (:first_name,:last_name,:phone,:gender,:email,:password,'user','inactive')";
$stmt = $pdo->prepare($query);
$stmt->bindParam("first_name", $first_name, PDO::PARAM_STR);
$stmt->bindParam("last_name", $last_name, PDO::PARAM_STR);
$stmt->bindParam("phone", $phone, PDO::PARAM_INT);
$stmt->bindParam("gender", $gender, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "REGISTERED SUCCESSFULLY");
} else {

sendResponse(false, "User registration failed");}
