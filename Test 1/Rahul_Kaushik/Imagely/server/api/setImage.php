<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false,"Invalid request method");
}else{
    if (!isset($_POST["img_name"])) {
        sendResponse(false,"Name is required");
    }
    if (!isset($_POST["img_url"])) {
        sendResponse(false,"Url is required");
    }

    $img_name = $_POST["img_name"];
    $img_url = $_POST["img_url"];
    $pdo = connect();

    $query = "INSERT INTO images(img_name, img_url) VALUES(:img_name, :img_url)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":img_name", $img_name, PDO::PARAM_STR);
    $stmt->bindParam(":img_url", $img_url, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        sendResponse(false,"No Image to Insert");
    }else{
        sendResponse(true,"Image Inserted");
    }

}
?>