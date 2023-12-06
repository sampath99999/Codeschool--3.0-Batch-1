<?php

require_once "DBConn.php";
$status = true;

$email = $_POST['emailId'];
$fName = $_POST['fName'];
$lName = $_POST['lName'];
$location_id = $_POST['location_id'];
$working_status_id = $_POST['working_status_id'];
$working_postion_id = $_POST['working_postions_id'];
$phone = $_POST['phone'];
$errorMessage = '';

if (!$working_postion_id) {
    $errorMessage .= "Please Select The Working Position \n";
}

if (!$working_status_id) {
    $errorMessage .= "Please Select The Working Status \n";
}

if (!$location_id) {
    $errorMessage .= "Please Select The Location \n";
}

$specialPattern = '/[@$&<>*^%]/';

if (!$fName) {
    $errorMessage .= "Please Enter the First Name\n";
} else if (preg_match($specialPattern, $fName)) {
    $errorMessage .= "Please Enter the First Name without Special Symbols\n";
} else if (strlen($fName) > 12) {
    $errorMessage .= "Please Enter the First Name Less Than 12 Characters\n";
}

if (strlen($phone) != 10) {
    $errorMessage .= "Please Enter a 10-digit Phone Number\n";
} else if (!is_numeric($phone)) {
    $errorMessage .= "Please Enter only Numbers for the Phone Number\n";
} else if (substr($phone, 0, 1) === '0') {
    $errorMessage .= "Phone number should not start with Zero\n";
}

$pattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';

if (!$email) {
    $errorMessage .= "Please Enter a valid Email\n";
} else if (!preg_match($pattern, $email)) {
    $errorMessage .= "Please Enter a valid Email\n";
}

if (strlen($errorMessage) != 0) {
    $response = ["status" => false, "message" => nl2br($errorMessage)];
    echo json_encode($response);
    return;
}





try {



    $addEmployeeDetails = $pdo->prepare("insert into employees (f_name,l_name,phone,email,working_status_id,working_postions_id ,location_id) values ('".$fName."','".$lName."','".$phone."','".$email."','".$working_status_id."','".$working_postion_id."','".$location_id."'); ");
    $addEmployeeDetails->execute();

    $response = ["status" => true, "message" => "Added Sucessfully", "data" => null];
    echo json_encode($response);
} catch (PDOException) {
    $response = ["status" => false, "message" => "Something Went Wrong !"];
    echo json_encode($response);
    return;
}
