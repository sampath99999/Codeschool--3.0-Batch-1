<?php 
require_once "dbconnetion.php";
$status=true;


try{

$statement = $pdo->prepare("select users_id,order_no,name,image,sum(price*quantity) as total_price,quantity,status_name as order_status from product as p join orders as o on p.id=o.product_id join orders_status as os on os.id= o.orders_status_id  group by users_id, order_no, name, image, quantity, status_name order by  order_no ;");
$statement->execute([]);
$result= $statement->fetchAll(PDO::FETCH_ASSOC);

if(count($result)==0){
    $response=[
        "status"=> false, "message"=>"no item ordered yet", "data"=> null    ];
        echo json_encode($response);
        return;
}

$response=["status"=>true,"message"=>"order load  sucessfully","data"=>$result];
echo json_encode($response);
 
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
