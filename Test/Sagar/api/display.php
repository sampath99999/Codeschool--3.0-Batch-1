<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    sendResponse(false, "Invalid request method");
}

$pdo = connect();

$stmt = $pdo->query("SELECT id, bookname, bookimage, author, price FROM books");
$stmt->execute();


$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


header('Content-Type: application/json');
echo json_encode($results);