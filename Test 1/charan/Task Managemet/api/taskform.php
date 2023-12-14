<?php

require("./utils/function.php");

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

// Check if taskname and taskdescription are set
if (!isset($_POST["taskname"]) || !isset($_POST["taskdescription"])) {
    sendResponse(false, "Both taskName and taskDescription are required");
}

// Get taskname and taskdescription from POST data
$taskname = $_POST["taskname"];
$taskdescription = $_POST["taskdescription"];

// Additional Validation (adjust as needed)
if (empty($taskname) || empty($taskdescription)) {
    sendResponse(false, "Both taskName and taskDescription must not be empty");
}

// Database connection
$pdo = connect();

try {
    // Prepare and execute the SQL query
    $query = "INSERT INTO task(task_name, task_desc) VALUES (:taskname, :taskdescription)";
    $stmt = $pdo->prepare($query);
    
    // Bind parameters
    $stmt->bindParam(":taskname", $taskname, PDO::PARAM_STR);
    $stmt->bindParam(":taskdescription", $taskdescription, PDO::PARAM_STR);

    // Execute the query
    $stmt->execute();

    // Check if the insertion was successful
    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Task registered successfully");
    } else {
        sendResponse(false, "Task registration failed");
    }
} catch (PDOException $e) {
    // Log the error or handle it in a way that makes sense for your application
    sendResponse(false, "An error occurred during task registration");
}
?>
