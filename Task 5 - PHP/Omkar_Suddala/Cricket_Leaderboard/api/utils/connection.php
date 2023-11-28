<?php
function connect()
{
    $host = 'localhost';
    $port = '5433';
    $db_name = 'Cricket';
    $db_username = 'postgres';
    $db_password = 'root';

    $conStr = sprintf(
        "pgsql:host=%s;port=%d;dbname=%s;user=%s;password=%s",
        $host,
        $port,
        $db_name,
        $db_username,
        $db_password
    );

    $pdo = new \PDO($conStr);
    $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

    return $pdo;
}
    function sendResponse($status = false, $message = "", $data = null){
        echo json_encode(["status" => $status, "message" => $message, "data"=> $data]);
      
        exit();
    }