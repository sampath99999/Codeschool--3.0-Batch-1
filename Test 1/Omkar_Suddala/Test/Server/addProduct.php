<?php
require('./utils/connection.php');

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}
$pdo = connect();


$user_id=$_POST['user_id'];
$productName=$_POST['productName'];
$productImage=$_POST['productImage'];
$productActualPrice=$_POST['productActualPrice'];
$prdouctOfferPrice=$_POST['prdouctOfferPrice'];
$productSize=$_POST['productSize'];
$productRating=$_POST['productRating'];
$productReviews=$_POST['productReviews'];

$query = "INSERT INTO
products (
    user_id,
    productName,
    productImage,
    productActualPrice,
    prdouctOfferPrice,
    productSize,
    productRating,
    productReviews
)
 VALUES (:user_id,
        :productName,
        :productImage,
        :productActualPrice,
        :prdouctOfferPrice,
        :productSize,
        :productRating,
        :productReviews)";

$stmt = $pdo->prepare($query);

$stmt->bindParam("user_id",$user_id, PDO::PARAM_INT);
$stmt->bindParam("productName",$productName, PDO::PARAM_STR);
$stmt->bindParam("productImage",$productImage, PDO::PARAM_STR);
$stmt->bindParam("productActualPrice",$productActualPrice, PDO::PARAM_INT);
$stmt->bindParam("prdouctOfferPrice",$prdouctOfferPrice, PDO::PARAM_INT);
$stmt->bindParam("productSize",$productSize, PDO::PARAM_STR);
$stmt->bindParam("productRating",$productRating, PDO::PARAM_INT);
$stmt->bindParam("productReviews",$productReviews, PDO::PARAM_INT);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Product Added Successfully");
}
else{
    sendResponse(false, "Product Added failed");

}
