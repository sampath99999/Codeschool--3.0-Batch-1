<?php

require('./utils/functions.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // echo "Its working";

    $id = $_POST["movieid"];
    // echo $id;

    $pdo = connect();

    $query = "DELETE FROM movies WHERE movieid=:id";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $movieid, PDO::PARAM_STR);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo "Deleted Successfully";
    } else {
        echo "Dont Know";
        sendResponse(false, "Not deleted");
    }
} else {
    echo "Invalid request method";
}
