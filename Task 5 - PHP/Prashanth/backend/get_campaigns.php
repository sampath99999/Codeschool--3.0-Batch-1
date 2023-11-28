<?php

require("./utils/connection.php");

if($_SERVER["REQUEST_METHOD"] != "GET") {
    sendResponse(false, "Invalid request method");
}
$pdo = connect();
$stmt = $pdo->query('SELECT campaign_id, name, description, goal_amount, start_date, end_date FROM campaigns');
$campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);

$jsonData = [];

foreach ($campaigns as $campaign) {
    $row = []; // Create an array for each row

    $keys = array_keys($campaign);

    for ($j = 0; $j < count($keys); $j++) {
        $key = $keys[$j];
        $value = $campaign[$key];
        $row[$key] = $value; // Add key-value pairs to the row array
    }

    // Add the row array to the JSON data array
    $jsonData[] = $row;
}
echo json_encode($campaigns);
