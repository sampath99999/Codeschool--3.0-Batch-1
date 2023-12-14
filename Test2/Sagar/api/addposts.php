<?php

require("./utils/functions.php");


if($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if(!isset($_POST["postimage"])) {
    sendResponse(false, "Post Image is required");
}


if(!isset($_POST["posttitle"])) {
    sendResponse(false, "Post Title is required");
}



if(!isset($_POST["postdescription"])) {
    sendResponse(false, "Post Description is required");
}






$postimage = $_POST["postimage"];
$posttitle = $_POST["posttitle"];
$postdescription = $_POST["postdescription"];



$pdo = connect();


$query = "INSERT INTO posts (postimage, posttitle, postdescription) VALUES (:postimage, :posttitle, :postdescription)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("postimage", $postimage, PDO::PARAM_STR);
$stmt->bindParam("posttitle", $posttitle, PDO::PARAM_STR);
$stmt->bindParam("postdescription", $postdescription, PDO::PARAM_STR);


$stmt->execute();
if($stmt->rowCount() > 0) {
    sendResponse(true, "Book Added Successfully");
    // header('location:./dashboard.html');
}

sendResponse(false, "Book Addition failed");
