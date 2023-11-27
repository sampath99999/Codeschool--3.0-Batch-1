<?php

require_once "DBConnction.php";
$status=true;
$subject_id=$_POST["subject_id"];

try{


$getExam=$pdo->prepare("select s.name, se.exam_name,se.total_no_of_qustions from subject_exam as se join subjects as s on se.subject_id=s.id where subject_id=?;");
$getExam->execute([$subject_id]);
$getExamDetails= $getExam->fetchAll(PDO::FETCH_ASSOC);
   if(count($getExamDetails)==0){
    $response=["status"=>false,"message"=> "No Test is added yet !"];
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

