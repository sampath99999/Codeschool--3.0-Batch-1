<?php

require_once "dbConnction.php";

$menuId = $_POST["menuId"];



if (!(array_key_exists('menuId', $_POST)) || !$_POST['menuId']) {
    $response = ["status" => false, "message" => "Menu Id is Not Valid"];
    echo json_encode($response);
    return;
}
if (!is_numeric($menuId)) {
    $response = ["status" => false, "message" => "Menu Id only contain Numbers"];
    echo json_encode($response);
    return;
}
try {

    $getContains = $pdo->prepare("select title,description from components where menuId=:menuId");
    $getContains->bindParam(':menuId', $menuId, PDO::PARAM_INT);
    $getContains->execute();
    $getContainsDetails = $getContains->fetchAll(PDO::FETCH_ASSOC);
    if (count($getContainsDetails) == 0) {
        $response = ["status" => false, "message" => " Contains Detalis is Empty  !"];
        echo json_encode($response);
        return;
    }
    $response = ["status" => true, "message" => "Data Get  Sucessfully", "data" => $getContainsDetails];
    echo json_encode($response);
}
 catch (PDOException) {
    $response = ["status" => false, "message" => "Something Went Wrong"];
    echo json_encode($response);
    return;
}
