<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false, "Invalid Method Request");
}else{
    if(!isset($_POST["userId"])){
        sendResponse(false,"User Id required");
    }
    if(!isset($_POST["postTitle"])){
        sendResponse(false,"Post Title required");
    }
    if(!isset($_POST["postContent"])){
        sendResponse(false,"Post Content required");
    }

    $userId = $_POST["userId"];
    $postTitle = $_POST["postTitle"];
    $postContent = $_POST["postContent"];

    $pdo = connect();

    $query = "INSERT INTO posts(user_id, post_title, post_text, post_status) VALUES(:user_id, :post_title, :post_text, 1)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
    $stmt->bindParam(":post_title", $postTitle, PDO::PARAM_STR);
    $stmt->bindParam(":post_text", $postContent, PDO::PARAM_STR);
    $stmt->execute();

    if($stmt->rowCount() > 0){
        sendResponse(true, "Data Inserted");
    }else{
        sendResponse(false,"Data Not Inserted");
    }
}
?>