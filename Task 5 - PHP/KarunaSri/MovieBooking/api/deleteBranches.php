<?php
require("./utils/functions.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // echo "Its working TB";

    $branchID = $_POST["id"];
    // echo "$branchID";
    $pdo = connect();


    if ($branchID > 0) {
        // Check if any shows are currently running for the branch
        $sqlCheckShows = "SELECT COUNT(*) AS showCount
                          FROM TheaterBranchMovieShows TBS
                          WHERE TBS.BranchID = :branchID
                            AND TBS.ShowDate >= CURRENT_DATE";

        $stmtCheckShows = $pdo->prepare($sqlCheckShows);
        $stmtCheckShows->bindParam(':branchID', $branchID, PDO::PARAM_INT);
        $stmtCheckShows->execute();

        $rowCheckShows = $stmtCheckShows->fetch(PDO::FETCH_ASSOC);
        $showCount = intval($rowCheckShows['showCount'] ?? 0);

        if ($showCount > 0) {
            // Movies are currently running, restrict deletion
            echo "Cannot delete. Movies are currently running in this theater branch.";
            // echo json_encode(['status' => 'error', 'message' => 'Cannot delete. Movies are currently running in this theater branch.']);
        } else {
            // Deleting the branch if no movie is running
            $sqlDeleteBranch = "DELETE FROM TheaterBranches WHERE BranchID = :branchID";
            $stmtDeleteBranch = $pdo->prepare($sqlDeleteBranch);
            $stmtDeleteBranch->bindParam(':branchID', $branchID, PDO::PARAM_INT);

            if ($stmtDeleteBranch->execute()) {
                echo " Theater branch deleted successfully";
                // echo json_encode(['status' => 'success', 'message' => 'Theater branch deleted successfully']);
            } else {

                echo json_encode(['status' => 'error', 'message' => 'Error deleting theater branch: ' . $stmtDeleteBranch->errorInfo()[2]]);
            }
        }
    } else {
        echo "Invalid BranchID";
    }
} else {
    echo "Invalid request method";
}
