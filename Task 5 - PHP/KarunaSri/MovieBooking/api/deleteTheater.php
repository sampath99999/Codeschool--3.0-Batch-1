<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // echo "Its working";

    $theaterID = $_POST["id"];
    // echo "$theaterID";
    $pdo = connect();


    if ($theaterID > 0) {
        // echo " In ths con" . $theaterID;
        $query = 'SELECT COUNT(*) AS showCount
                          FROM TheaterBranchMovieShows TBS
                          WHERE TBS.BranchID IN (SELECT BranchID FROM TheaterBranches WHERE TheaterID = :theaterID)
                            AND TBS.ShowDate >= CURRENT_DATE';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':theaterid', $theaterID, PDO::PARAM_INT);
        $stmt->execute();
        $rowCheckShows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $showCount = intval($rowCheckShows['showCount'] ?? 0);

        if ($showCount > 0) {
            // Movies are currently running, restrict deletion
            echo "Cannot delete. Movies are currently running in this theater.";
        } else {
            // Perform the delete operation
            $query = 'DELETE FROM Theaters WHERE TheaterID = $theaterID';
            $stmt = $pdo->prepare($query);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo "Theater deleted successfully";
            } else {
                echo "Error deleting theater";
            }
        }
    } else {
        echo "Invalid TheaterID";
    }
} else {
    echo "Invalid request method";
}
