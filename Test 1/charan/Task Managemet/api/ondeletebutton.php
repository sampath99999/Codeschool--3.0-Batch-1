<?php

require("utils/function.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idToDelete = $_POST['id'];

    try {
        $pdo=connect();

        // Delete the record
        $stmtDelete = $pdo->prepare("DELETE FROM completedbutton WHERE task_id = :id");
        $stmtDelete->bindParam(':id', $idToDelete, PDO::PARAM_INT);
        $stmtDelete->execute();

        // Update subsequent records
        $stmtUpdate = $pdo->prepare("UPDATE completedbutton SET task_id = task_id - 1 WHERE task_id > :id");
        $stmtUpdate->bindParam(':id', $idToDelete, PDO::PARAM_INT);
        $stmtUpdate->execute();

        $pdo->commit();
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        // Handle the exception (rollback, log, etc.)
        $pdo->rollBack();
        echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
    }
} else {
    // Handle invalid request method
    echo json_encode(['error' => 'Invalid request method']);
}
?>
