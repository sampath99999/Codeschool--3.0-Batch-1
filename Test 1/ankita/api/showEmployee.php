<?php 
require_once "DBConn.php";
$status=true;


try{
$statement1 = $pdo->prepare("select * from working_status");
     $statement1->execute();
    $result1= $statement1->fetchAll(PDO::FETCH_ASSOC);

$statement2 = $pdo->prepare("select * from location");
     $statement2->execute();
    $result2= $statement2->fetchAll(PDO::FETCH_ASSOC);


$statement3 = $pdo->prepare("select * from working_postions");
     $statement3->execute();
    $result3= $statement3->fetchAll(PDO::FETCH_ASSOC);
$statement4 = $pdo->prepare("select  empcode, concat(f_name, ' ', l_name) as name, phone,email,ws.description as working_status, l.description as location, wp.description as working_postions from employees as e join working_status as ws on ws.id = e.working_status_id   join working_postions as wp on wp.id =e.working_postions_id  join location as l on  l.id =e.location_id  order by empcode;
 ");
$statement4->execute();
$result4= $statement4->fetchAll(PDO::FETCH_ASSOC);

if(count($result1)==0){
    $status = false;
    $message = "no working_status found";
   
}
if(count($result2)==0){
    $status = false;
    $message = "no location found";
   
}
if(count($result3)==0){
    $status = false;
    $message = "no working_postions found";
   
}
if(count($result4)==0){
    $response=[
        "status"=> false, "message"=>"No employees here", "data"=> null    ];
        echo json_encode($response);
        return;
}
$response=["status"=>true,"message"=>"employees details ","data"=>["working_status"=>$result1,"location"=>$result2,"working_postions"=>$result3,"empDetail"=>$result4]];
echo json_encode($response);

} 

catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
?>