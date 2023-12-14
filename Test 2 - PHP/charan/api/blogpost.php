<?php

require("./utils/functions.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}


if ((!isset($_POST["image"]) || !isset($_POST["title"]) || !isset($_POST["description"]))) {
    sendResponse(false, "Image , title and Description  are required");
}
$image =$_POST["image"];
$title = $_POST["title"];
$description = $_POST["description"];


if (empty($image) || empty($title) || empty($description)) {
    sendResponse(false, "Image , title and Description must not be empty");
}

$pdo = connect();

try {
    
    $query = "INSERT INTO blogposts(image,title,description) VALUES (:image,:title,:description)";
    $stmt = $pdo->prepare($query);
    
    $stmt->bindParam(":image", $image, PDO::PARAM_STR);
    $stmt->bindParam(":title", $title, PDO::PARAM_STR);
    $stmt->bindParam(":description", $description, PDO::PARAM_STR);

    
    $stmt->execute();

    
    if ($stmt->rowCount() > 0) {
        sendResponse(true, "  Yahoo!!!!");
    } else {
        sendResponse(false, "Failed!!");
    }
} catch (PDOException $e) {
    
    sendResponse(false, "An error occurred during blog registration");
}
?>
