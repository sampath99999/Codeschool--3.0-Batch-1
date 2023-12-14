<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false,"Invalid request method");
}else{
    if (!isset($_POST["img_name"])) {
        sendResponse(false,"Name is required");
    }

    $img_name = $_POST["img_name"];
    $pdo = connect();

    $query = "SELECT * FROM images WHERE img_name = :img_name";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":img_name", $img_name, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        sendResponse(false,"No photo to show");
    }

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $jsonResult = json_encode($result);

    header('Content-Type: application/json');
    echo $jsonResult;
}
?>