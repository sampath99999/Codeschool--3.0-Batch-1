<?php
require("utils/functions.php");

try {
    $pdo = connect();

    $query = "SELECT * FROM blogposts";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Set content type header
    header('Content-Type: application/json');

    // Encode and echo the JSON result
    echo json_encode($result);
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo "Error: " . $e->getMessage();
}
?>
