<?php

require_once "DBConnction.php";
$status=true;


try{


$getSubjects=$pdo->prepare("select id,name ,image from subjects;");
$getSubjects->execute([]);
$getSubjectsDetails= $getSubjects->fetchAll(PDO::FETCH_ASSOC);
   if(count($getSubjectsDetails)==0){
    $response=["status"=>false,"message"=> "No subjects found !"];
    echo json_encode($response);
    return;
   }
$response=["status"=>true,"message"=>"Subjects  get  sucessfully","data"=>$getSubjectsDetails];
echo json_encode($response);
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}
?>

