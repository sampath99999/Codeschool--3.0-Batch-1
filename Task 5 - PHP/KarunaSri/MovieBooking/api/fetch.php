<?php

require("./utils/functions.php");


$pdo = connect();



$datafetch = array(
    "Date" => "time()",
    "Payment" => array("Credit Card", "PayPal", "PhonePay", "Paytm", "GooglePay"),
    //   "showid"=>
);

echo $datafetch;
