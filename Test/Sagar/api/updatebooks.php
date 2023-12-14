<?php

require("./utils/functions.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["id"])) {
    sendResponse(false, "Book Id is required");
}
if (!isset($_POST["bookname"])) {
    sendResponse(false, "ProductName is required");
}
if (!isset($_POST["bookimage"])) {
    sendResponse(false, "Image is required");
}
if (!isset($_POST["author"])) {
    sendResponse(false, "Author name is required");
}
if (!isset($_POST["price"])) {
    sendResponse(false, "Price is required");
}


$id = $_POST['id'];
$bookname = $_POST["bookname"];
$bookimage = $_POST["bookimage"];
$author = $_POST["author"];
$price = $_POST["price"];

$pdo = connect();





$query = "UPDATE books SET id=$id, bookname = $bookname, bookimage = $bookimage, author = $author ,price=$price WHERE id=$id";

$stmt = $pdo->prepare($query);
$stmt->bindParam("id", $id, PDO::PARAM_STR);
$stmt->bindParam("bookname", $productname, PDO::PARAM_STR);
$stmt->bindParam("bookimage", $productimage, PDO::PARAM_STR);
$stmt->bindParam("author", $author, PDO::PARAM_STR);
$stmt->bindParam("price", $price, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Product Updated Successfully");
    // header('location:./dashboard.html');
}

sendResponse(false, "Product Updation failed");


