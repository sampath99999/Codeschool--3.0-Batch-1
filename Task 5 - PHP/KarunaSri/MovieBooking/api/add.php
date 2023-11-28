print_r($_POST);
<?php

require("./utils/functions.php");
$pdo = connect();

foreach ($_POST['movie_name'] as $key => $values) {
    $query = 'INSERT INTO movie_list(movie_name,genre,theater) VALUES (:movie_name,:genre,:theater)';

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':movie_name', $values[0], PDO::PARAM_STR);
    $stmt->bindParam(':genre', $values[1], PDO::PARAM_STR);
    $stmt->bindParam(':theater', $values[2], PDO::PARAM_STR);
    $stmt->execute();
}
echo 'Items Inserted Successfully';
