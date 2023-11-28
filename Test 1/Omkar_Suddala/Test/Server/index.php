<?php

require("./utils/connection.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["token"])) {
    http_response_code(400);
    sendResponse(false, "Token is required");
}

$token = $_POST["token"];

$pdo = connect();

$query = "SELECT u.user_id,u.fullname,p.productName,
p.productImage,
p.productActualPrice,
p.prdouctOfferPrice,
p.productSize,
p.productRating,
p.productReviews from users u join products p on u.user_Id=p.user_Id where token= :token";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["user" => $user]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
