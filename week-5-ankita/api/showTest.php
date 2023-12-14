<?php

require_once "DBConnction.php";
$status=true;
$subject_id=$_POST["subject_id"];

try{


$getExam=$pdo->prepare("select exam_name ,id from subject_exam where subject_id=?;");
$getExam->execute([$subject_id]);
$getExamDetails= $getExam->fetchAll(PDO::FETCH_ASSOC);
   if(count($getExamDetails)==0){
    $response=["status"=>false,"message"=> "No Exam  is added yet !"];
    echo json_encode($response);
    return;
   }
$response=["status"=>true,"message"=>"data get  sucessfully","data"=>$getExamDetails];
echo json_encode($response);
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}
?>

