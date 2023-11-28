<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {
    $selectedShow = $_POST['showSelect'];

    $pdo = connect();
    $query = "SELECT running_show FROM shows WHERE id = :selectedShow;";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(":selectedShow", $selectedShow, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && $result['running_show'] == true) {
        sendResponse(true, "Show $selectedShow is running!");
    } else {
        sendResponse(false, "Show $selectedShow is not running.");
    }
} catch (Exception $e) {
    sendResponse(false, "Invalid URL or server error.");
}
