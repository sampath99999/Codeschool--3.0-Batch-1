<?php

require("./utils/functions.php");

if (isset($_POST["userid"])) {
    $pdo = connect();
    $userIDToDelete = $_POST["userid"];

    $query = "DELETE FROM campaigns WHERE userid = :userid";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":userid", $userIDToDelete, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record";
    }
} else {
    echo "User ID not provided";
}

?>
