<?php

require_once "dbConnction.php";

$menuId = $_POST["menuId"];


if(!(array_key_exists('menuId',$_POST)) || !$_POST['menuId']){
    $response=["status"=>false,"message"=> "Menu Id  is not valid"];
    echo json_encode($response);
    return;
  }
if(! is_numeric($menuId)){
    $response=["status"=>false,"message"=> "Menu Id only contain numbers"];
    echo json_encode($response);
    return;

  }


try {

  $getContain = $pdo->prepare("select title ,description from components where menuId= :menuId");
    $getContain->bindParam(':menuId', $menuId, PDO::PARAM_INT);
    $getContain->execute();
    $getContainDetails = $getContain->fetchAll(PDO::FETCH_ASSOC);
    if (count($getContainDetails) == 0) {
        $response = ["status" => false, "message" => "  Contains Detalis is Empty  !"];
        echo json_encode($response);
        return;
    }

    $response = ["status" => true, "message" => "Data Get  Sucessfully", "data" => $getContainDetails];
    echo json_encode($response);
}
 catch (PDOException) {
    $response = ["status" => false, "message" => "Something Went Wrong"];
    echo json_encode($response);
    return;
}
