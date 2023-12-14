<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require("./utils/functions.php");

if (!$_SERVER["REQUEST_METHOD"] == "POST") {
    sendResponse(false, "Invalid request method");
} else {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
    sendResponse(false, $nameErr);
  } 
  

  if (empty($_POST["price"])) {
    $priceErr = "price is required";
    sendResponse(false, $emailErr);
  }

  if (empty($_POST["image"])) {
    $imageErr = "image is required";
    sendResponse(false, $imageErr);
  }

  if (empty($_POST["category"])) {
    $categoryErr = "category Required";
    sendResponse(false, $categoryErr);
  }

  if (empty($_POST["description"])) {
    $descriptionErr = "category Required";
    sendResponse(false, $descriptionErr);
  }

}



$name = $_POST["name"];
$price = $_POST["price"];
$image = $_POST["image"];
$description = $_POST["description"];
$category = $_POST["category"];


$pdo = connect();




$query = "INSERT INTO products (name, price, image, category, description) VALUES (:name, :price, :image, :category, :description)";

$stmt = $pdo->prepare($query);
$stmt->bindParam(":name", $name, PDO::PARAM_STR);
$stmt->bindParam(":price", $price, PDO::PARAM_STR);
$stmt->bindParam(":image", $image, PDO::PARAM_STR);
$stmt->bindParam(":category", $category, PDO::PARAM_INT);
$stmt->bindParam(":description", $description, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0 ) {
    sendResponse(true, "Registered Successfully");
    exit;
}else{
    sendResponse(false, "User registration failed");
}
?>