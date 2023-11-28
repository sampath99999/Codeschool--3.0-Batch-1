<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Invalid request method";
}

$title = $_POST["title"];
$genre = $_POST["genre"];
$date = $_POST["releasedate"];
$releasedate = date("Y-m-d", strtotime($date));
$duration = $_POST["duration"];
// $releasedate = date('Y-m-d', strtotime($_POST['releasedate']));

$pdo = connect();

try {
    $query = 'INSERT INTO movies(title,genre,releasedate,duration) VALUES (:title,:genre,:releasedate,:duration)';

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':genre', $genre, PDO::PARAM_STR);
    $stmt->bindParam(":releasedate", $releasedate, PDO::PARAM_STR);
    $stmt->bindParam(":duration", $duration, PDO::PARAM_INT);

    // echo "Inserted Title: " . $title . "<br>";
    // echo "Inserted Genre: " . $genre . "<br>";
    // echo "Inserted Release Date: " . $releasedate . "<br>";
    // echo "Inserted Duration: " . $duration . "<br>";
    $stmt->execute();
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}

if ($stmt->rowCount() > 0) {
    echo "Inserted Successfully";
} else {
    echo "Failed to insert data into the database.";
}
