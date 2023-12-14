<?php

require_once "dbConnction.php";

$subjectId = $_POST["subjectId"];



if (!(array_key_exists('subjectId', $_POST)) || !$_POST['subjectId']) {
    $response = ["status" => false, "message" => "Subject Id is Not Valid"];
    echo json_encode($response);
    return;
}
if (!is_numeric($subjectId)) {
    $response = ["status" => false, "message" => "Subject Id  Contain Only Numbers"];
    echo json_encode($response);
    return;
}
try {

    $getMenu = $pdo->prepare(" select * from menu as m join components as c on m.id = c.menuId where subjectsId =  :subjectId");
    $getMenu->bindParam(':subjectId', $subjectId, PDO::PARAM_INT);
    $getMenu->execute();

    $getMenuDetails = $getMenu->fetchAll(PDO::FETCH_ASSOC);
    if (count($getMenuDetails) == 0) {
        $response = ["status" => false, "message" => " Menu Detalis is Empty  !"];
        echo json_encode($response);
        return;
    }
   
    $response = ["status" => true, "message" => "Data Get  Sucessfully", "data" => $getMenuDetails];
    echo json_encode($response);
} catch (PDOException) {
    $response = ["status" => false, "message" => "Something Went Wrong"];
    echo json_encode($response);
    return;
}
