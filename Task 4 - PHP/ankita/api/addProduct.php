<?php 
require_once "dbconnetion.php";
$status=true;
$category_id=$_POST["category_id"];
$image=$_POST["image"];
$name=$_POST["name"];
$price=$_POST["price"];
$specialPattern = '/[!@@#$%^^&*()_>:{<>_(*^$#@!#$^*())}]/';
$imagePattern = '/\.([jJ][pP][eE][gG]|[gG][iI][fF]|[pP][nN][gG])$/';
if(!(array_key_exists('category_id',$_POST)) || !$_POST['category_id']){
    $response=["status"=>false,"message"=> " category_id is not valid"];
    echo json_encode($response);
    return;
  }
  if(!(array_key_exists('image',$_POST)) || !$_POST['image']){
     $response=["status"=>false,"message"=> "no valid  image "];
    echo json_encode($response);
    return;
  }
if(!(array_key_exists('name',$_POST)) || !$_POST['name']){
    $response=["status"=>false,"message"=> "  product name is not valid"];
    echo json_encode($response);
    return;
  }
  if(!(array_key_exists('price',$_POST)) || !$_POST['price']){
     $response=["status"=>false,"message"=> " price is not valid   "];
    echo json_encode($response);
    return;
  }
if(!$status){
    $response=["status"=>false,"message"=> "please filled the required field"];
    echo json_encode($response);
    return;
   }



if ($category_id == " ") {
  $response=["status"=>false,"message"=> "plz select the category type"];
    echo json_encode($response);
    return;
}

if (empty($name)) {
$response=["status"=>false,"message"=> "plz enter the product name"];
    echo json_encode($response);
    return;

}

if (preg_match($specialPattern, $name)) {
$response=["status"=>false,"message"=> "plz enter the product name without special symbols"];
    echo json_encode($response);
    return;
}

if (strlen($name) > 12) {
$response=["status"=>false,"message"=> "plz enter the product name less than 12 characters"];
    echo json_encode($response);
    return;

}

if (empty($image)) {
  $response=["status"=>false,"message"=> "plz enter the product image"];
    echo json_encode($response);
    return;
    
}

if (!preg_match($imagePattern, $image)) {
$response=["status"=>false,"message"=> "plz choose only image file"];
    echo json_encode($response);
    return;
   
}

if (empty($productPrice)) {
$response=["status"=>false,"message"=> "plz enter the product price"];
    echo json_encode($response);
    return;

}

if (!is_numeric($productPrice)) {
$response=["status"=>false,"message"=> "enter only numbers"];
    echo json_encode($response);
    return;
   
}






try{
    $statement1 = $pdo->prepare("insert into product (category_id,name,price,image) values (?,?,?,?)");
     $statement1->execute([$category_id,$name,$price,$image]);
    $response=['status'=>true,'message'=>'product added'];
    echo json_encode($response);
 
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
