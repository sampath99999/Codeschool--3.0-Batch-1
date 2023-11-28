<?php
header('Content-Type: application/json'); // Set the content type header to JSON

require("./utils/functions.php"); // Correct the path and add the file extension
$pdo = connect();

$query = "SELECT * FROM campaigns";
$stmt = $pdo->prepare($query);
$stmt->execute();

$campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Create an array to hold the JSON-encoded data
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

// Output the entire data array as JSON
echo json_encode($jsonData);
?>
