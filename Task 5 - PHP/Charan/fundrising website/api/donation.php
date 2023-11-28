<?php

require("./utils/functions.php");

if($_SERVER["REQUEST_METHOD"] != "GET") {
    sendResponse(false, "Invalid request method");
}
$pdo = connect();
$stmt = $pdo->query('SELECT donor_name, donor_email, amount FROM donations');
$donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

$jsonData = [];

foreach ($donations as $donation) {
    $row = []; // Create an array for each row

    $keys = array_keys($donation);

    for ($j = 0; $j < count($keys); $j++) {
        $key = $keys[$j];
        $value = $donation[$key];
        $row[$key] = $value; // Add key-value pairs to the row array
    }

    // Add the row array to the JSON data array
    $jsonData[] = $row;
}
echo json_encode($donations);