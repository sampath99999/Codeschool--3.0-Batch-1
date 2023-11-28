<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {


    $title = $_POST['title'];
    $description = $_POST['description'];
    $language = $_POST['language'];
    $status = $_POST['movieStatus'];


    $pdo = connect();
    $query = 'INSERT INTO movies ( title, description, language, status) VALUES ( :title, :description, :language, :status)';
    $stmt = $pdo->prepare($query);



    $stmt->bindParam(":title", $title, PDO::PARAM_STR);
    $stmt->bindParam(":description", $description, PDO::PARAM_STR);
    $stmt->bindParam(":language", $language, PDO::PARAM_STR);
    $stmt->bindParam(":status", $status, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Movie $title added successfully!");
    } else {
        sendResponse(false, "Error occurred while insertion!");
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
    sendResponse(false, $e->getMessage());
}
