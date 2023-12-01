<?php

require("./utils/functions.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["productname"])) {
    sendResponse(false, "ProductName is required");
}
if (!isset($_POST["productimage"])) {
    sendResponse(false, "Image is required");
}
if (!isset($_POST["price"])) {
    sendResponse(false, "Price is required");
}
$id = $_POST['id'];
$productname = $_POST["productname"];
$productimage = $_POST["productimage"];
$price = $_POST["price"];

$pdo = connect();

// hello



// $query = "SELECT * FROM Products WHERE ProductName = :ProductName";
// $stmt = $pdo->prepare($query);
// $stmt->bindParam("ProductName", $ProductName, PDO::PARAM_STR);

// $stmt->execute();
// if ($stmt->rowCount() > 0) {
//     sendResponse(false, "Product already exists");
// }



$query = "UPDATE products SET id=$id, productname = $productname, productimage = $productimage, price=$price WHERE id=$id";

$stmt = $pdo->prepare($query);
// $stmt->bindParam("id", $id, PDO::PARAM_STR);
$stmt->bindParam("productname", $productname, PDO::PARAM_STR);
$stmt->bindParam("productimage", $productimage, PDO::PARAM_STR);
$stmt->bindParam("price", $price, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Product Updated Successfully");
    // header('location:./dashboard.html');
}

sendResponse(false, "Product Updation failed");


