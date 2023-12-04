<?php

require("./utils/functions.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["bookname"])) {
    sendResponse(false, "BookName is required");
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

$bookname = $_POST["bookname"];
$bookimage = $_POST["bookimage"];
$author = $_POST["author"];
$price = $_POST["price"];

$pdo = connect();


$query = "INSERT INTO books (bookname, bookimage, author, price) VALUES (:bookname, :bookimage, :author, :price)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("bookname", $bookname, PDO::PARAM_STR);
$stmt->bindParam("bookimage", $bookimage, PDO::PARAM_STR);
$stmt->bindParam("author", $author, PDO::PARAM_STR);
$stmt->bindParam("price", $price, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Book Added Successfully");
    // header('location:./dashboard.html');
}

sendResponse(false, "Book Addition failed");
