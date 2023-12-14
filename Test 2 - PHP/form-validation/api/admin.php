<?php

require("./utils/functions.php");

$pdo = connect();

$query = "SELECT user_type FROM validForm WHERE email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':password', $password, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);



foreach ($result as $row) {
    $userType = $row['user_type'];

    echo $userType . "<br>";
}


$pdo = null;
?>
