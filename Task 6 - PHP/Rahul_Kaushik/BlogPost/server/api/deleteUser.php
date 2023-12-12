<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false, "Invalid Method Request");
}

if(!isset($_POST["userId"])){
    sendResponse(false,"User Id required");
}

$userId = $_POST["userId"];
$pdo = connect();

$query = "SELECT * FROM users WHERE user_id = :user_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    sendResponse(false, "User Already Deleted or Doesn't Exists");
}

$query = "DELETE FROM posts WHERE user_id = :user_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
$stmt->execute();

$query = "DELETE FROM users WHERE user_id = :user_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    sendResponse(true, "Successfully Deleted");
}

sendResponse(false, "Post Not Deleted");
?>