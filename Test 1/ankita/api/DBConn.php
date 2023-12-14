<?php

define("DB_HOST", "localhost");
define("DB_PORT", "5432");
define("DB_NAME", "employeesdetails");
define("DB_USERNAME", "postgres");
define("DB_PASSWORD", "postgres");

$response = ["status" => false, "message" => "", "data" => ""];

$pdo = new PDO("pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";user=" . DB_USERNAME . ";password=" . DB_PASSWORD);

if (!$pdo) {
  echo "Connection Failed";
  $response["message"] = "Database Not Connected!";
  echo json_encode($response);
  exit;
}
