<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false, "Invalid Method Request");
}

if (!isset($_POST["postId"])) {
    sendResponse(false, "Post Id required");
}

$postId = $_POST["postId"];

$pdo = connect();

$query = "SELECT * FROM posts WHERE post_status = 2 AND post_id = :post_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":post_id", $postId, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(false, "Already Reviewed");
}

$query = "UPDATE posts SET post_status = 2 WHERE post_id = :post_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":post_id", $postId, PDO::PARAM_INT);
$stmt->execute();


if ($stmt->rowCount() > 0) {
    sendResponse(true, "Successfully Updated");
}

sendResponse(false, "Data Not Updated Check Post ID");
?>