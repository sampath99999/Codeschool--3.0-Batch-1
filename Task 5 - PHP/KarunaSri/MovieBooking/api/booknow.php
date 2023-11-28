<?php

require("./utils/functions.php");

$pdo = connect();

$query = 'SELECT title FROM movies';
$stmt = $pdo->prepare($query);
$stmt->execute();



if ($stmt->rowCount() > 0) {
    $movie = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($movie);
}
