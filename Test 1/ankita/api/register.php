<?php

require_once "DBConn.php";
$status = true;

$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$name = $_POST['name'];
$hashedPassword = md5($password);


$errorMessage = '';
if (!(array_key_exists('email', $_POST)) || !$_POST['email']) {
    $errorMessage .= "Please Enter the valid email \n";
}
if (!(array_key_exists('password', $_POST)) || !$_POST['password']) {
    $errorMessage .= "Please Enter the valid password \n";
}

if (strlen($errorMessage) != 0) {
    $response = ["status" => false, "message" => nl2br($errorMessage)];
    echo json_encode($response);
    return;
}

if (strlen($name) > 12) {
    $errorMessage .= "Please Enter the name less than 12 characters \n";
} else if (preg_match('/[\'{#~?><>@,.|=_^£$%&*()}+¬-]/', $name)) {
    $errorMessage .= "Name sholud not have any Special Symbol \n";
}

if (strlen($phone) != 10) {
    $errorMessage .= "Please Enter 10 digit phone Number\n";
} else if (!is_numeric($phone)) {
    $errorMessage .= "Please Enter only number\n";
}


if (strlen($email) > 64) {
    $errorMessage .= "Email not valid Please enter within 64 character\n";
} else if (preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/', $email)) {
    $errorMessage .= "Email sholud not contain spceial symbol excluded @\n";
}

if (strlen($password) < 4 || strlen($password) > 16) {
    $errorMessage .= "Pasword should be minimum 8 character and maximum 16 character\n";
} else if (preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/', $password)) {
    $errorMessage .= "Password should dont have any spiceial character\n";
}

if (strlen($errorMessage) != 0) {
    $response = ["status" => false, "message" => nl2br($errorMessage)];
    echo json_encode($response);
    return;
}


try {

    $checkRegisterQuery = "select * from users where email = '" . $email . "' or phone = '" . $phone . "' ";

    $checkRegisterDetails = $pdo->prepare($checkRegisterQuery);
    $checkRegisterDetails->execute();
    $isVaildRegister = $checkRegisterDetails->fetchAll(PDO::FETCH_ASSOC);
    if (count($isVaildRegister) != 0) {
        $response = ["status" => true, "message" => "Phone Number or Email Exits ", "myResult" => $isVaildRegister];
        echo json_encode($response);
        return;
    }

    $query = "insert into users (username,password,email,phone) values ('" . $name . "','" . $hashedPassword . "','" . $email . "','" . $phone . "')";

    $addRegisterDetails = $pdo->prepare($query);
    $addRegisterDetails->execute();

    $response = ["status" => true, "message" => "Register Sucessfully", "myResult" => null];
    echo json_encode($response);
} catch (PDOException ) {
    $response = ["status" => false, "message" =>"Something Went Wrong"];
    echo json_encode($response);
    return;
}
