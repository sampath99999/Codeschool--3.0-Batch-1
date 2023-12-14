<?php

require_once "DBConn.php";
$status = true;
$email = $_POST['email'];
$password = $_POST['password'];
$hashedPassword = md5($password);
$errorMessage = '';
if (!(array_key_exists('email', $_POST)) || !$_POST['email']) {
    $errorMessage .= "Please Enter the Valid Email \n";
}
if (!(array_key_exists('password', $_POST)) || !$_POST['password']) {
    $errorMessage .= "Please Enter The Valid Password \n";

}

if (strlen($email) > 64) {
    $errorMessage .= "Email not valid please Enter Valid Email \n";
} else if (preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/', $email)) {
    $errorMessage .= "Email sholud not contain Special Symbol excluded @ \n";
}

if (preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/', $password)) {
    $errorMessage .= "Password should not have any  Special Character \n";
}
if (strlen($errorMessage) != 0) {
    $response = ["status" => false, "message" => nl2br($errorMessage)];
    echo json_encode($response);
    return;
}


try {
    $checkVaildLogInId = $pdo->prepare("select id,username,email,phone from users where email='" . $email . "' and password='" . $hashedPassword . "'; ");
    $checkVaildLogInId->execute();
    $isValidLogInId = $checkVaildLogInId->fetchAll(PDO::FETCH_ASSOC);
    if (count($isValidLogInId) == 0) {
        $response = ["status" => false, "message" => "Invalid LogIn Credential"];
        echo json_encode($response);
        return;
    }

    $token = rand(10000, 10000000);

    $userId = $isValidLogInId[0]['id'];


    $addToken = $pdo->prepare("insert into session_table (users_id,user_tokan) values('" . $userId . "','" . $token . "');");
    $addToken->execute();

    $allResult = [
        "token" => $token,
        "validLogInId" => $isValidLogInId
    ];
    $response = ["status" => true, "message" => "LogIn Sucessfully", "data" => $allResult];


    echo json_encode($response);
} catch (PDOException) {
    $response = ["status" => false, "message" => "Something Went Wrong"];
    echo json_encode($response);
    return;
}
