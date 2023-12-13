<?php

require("./utils/functions.php");

if($_SERVER["REQUEST_METHOD"] != "GET") {
    sendResponse(false, "Invalid request method");
}

$pdo = connect();

$query = "SELECT postimage, posttitle, postdescription, posted_on FROM posts";
$stmt = $pdo->prepare($query);
$stmt->execute();


$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


header('Content-Type: application/json');
echo json_encode($results);