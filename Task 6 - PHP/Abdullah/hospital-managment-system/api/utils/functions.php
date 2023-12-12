<?php

function connect()
{
    $host = 'localhost';
    $port = '5432';
    $db_name = 'hospital_managment_system';
    $db_username = 'abdullah';
    $db_password = 'zmzm';

    $conStr = sprintf(
        "pgsql:host=%s;port=%d;dbname=%s;user=%s;password=%s",
        $host,
        $port,
        $db_name,
        $db_username,
        $db_password
    );

    try {
        $pdo = new \PDO($conStr);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        return $pdo;
    } catch (\PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

function sendResponse($status = false, $message = "", $data = null)
{
    echo json_encode(["status" => $status, "message" => $message, "data" => $data]);
    exit();
}

function generateToken($pdo, $length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }

    $query = "SELECT * FROM patient WHERE token  = :token";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $randomString, \PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $randomString = generateToken($pdo, $length);
    }

    return $randomString;
}
