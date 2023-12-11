<?php

require_once "dbConnction.php";

$slug = $_POST["slug"];


if(!(array_key_exists('slug',$_POST)) || !$_POST['slug']){
    $response=["status"=>false,"message"=> "Slug  Array is empty"];
    echo json_encode($response);
    return;
  }
if(!preg_match('/^[a-zA-Z0-9]+(?:-[A-Za-z0-9]+)*\.html$/',$slug)){
    $response=["status"=>false,"message"=> "Slug is Not Vaild "];
    echo json_encode($response);
    return;
    }

try {

    $getSubjectId = $pdo->prepare(" select subjectsId from menu  where slug =  :slug");
    $getSubjectId->bindParam(':slug', $slug, PDO::PARAM_INT);
    $getSubjectId->execute();

    $getSubjectIdDetails = $getSubjectId->fetchAll(PDO::FETCH_ASSOC);
    if (count($getSubjectIdDetails) == 0) {
        $response = ["status" => false, "message" => " Subject Id  is Empty  !"];
        echo json_encode($response);
    }

    $getMenu = $pdo->prepare(" select * from menu  where subjectsId =  :subjectId  order by priority");
    $getMenu->bindParam(':subjectId', $getSubjectIdDetails[0]['subjectsid'], PDO::PARAM_INT);
    $getMenu->execute();

    $getMenuDetails = $getMenu->fetchAll(PDO::FETCH_ASSOC);
    if (count($getMenuDetails) == 0) {
        $response = ["status" => false, "message" => " Menu Detalis is Empty  !"];
        echo json_encode($response);
        return;
    }
    $getContain = $pdo->prepare("select c.title,c.description ,c.menuId from menu as m join components as c on m.id = c.menuId where slug= :slug");
    $getContain->bindParam(':slug', $slug, PDO::PARAM_INT);
    $getContain->execute();
    $getContainDetails = $getContain->fetchAll(PDO::FETCH_ASSOC);
    if (count($getContainDetails) == 0) {
        $response = ["status" => false, "message" => "  Contains Detalis is Empty  !"];
        echo json_encode($response);
        return;
    }
    $response = ["status" => true, "message" => "Data Get  Sucessfully", "data" => ["Contain" => $getContainDetails, "menuDetails" => $getMenuDetails]];
    echo json_encode($response);
} catch (PDOException) {
    $response = ["status" => false, "message" => "Something Went Wrong"];
    echo json_encode($response);
    return;
}
