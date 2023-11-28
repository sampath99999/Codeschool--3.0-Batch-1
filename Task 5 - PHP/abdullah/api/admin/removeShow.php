<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {
    $showId = $_POST['showSelect'];
    $pdo = connect();
    $query = 'DELETE FROM shows WHERE id = :showId;';
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(":showId", $showId, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Show Id: $showId removed successfully!");
    } else {
        sendResponse(false, "Error occurred while deleting show $showId.");
    }
} catch (Exception $e) {
    sendResponse(false, "Invalid URL or server error.");
}
