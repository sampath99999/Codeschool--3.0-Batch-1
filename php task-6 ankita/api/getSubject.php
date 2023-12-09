<?php

require_once "dbConnction.php";


try {

    $getSubjects = $pdo->prepare("select * from subjects ;");
    $getSubjects->execute();
    $getSubjectsDetails = $getSubjects->fetchAll(PDO::FETCH_ASSOC);
    if (count($getSubjectsDetails) == 0) {
        $response = ["status" => false, "message" => " Subject Detalis is Empty  !"];
        echo json_encode($response);
        return;
    }
    $response = ["status" => true, "message" => "Data Get  Sucessfully", "data" => $getSubjectsDetails];
    echo json_encode($response);
} catch (PDOException $e) {
    $response = ["status" => false, "message" => "Something Went Wrong"];
    echo json_encode($response);
    return;
}
