<?php

require("./utils/functions.php");

$pdo = connect();

$query = 'SELECT * FROM Theaters';

$stmt = $pdo->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
  $theaters = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($theaters);

  foreach ($theaters as $row) {
    echo "<tr>
        <td>{$row['theaterid']}</td>
        <td>{$row['theatername']}</td>
        <td>{$row['address']}</td>
       
        <td><button class='btn btn-danger' onclick='deleteTheater({$row['theaterid']})'>Delete</button></td>
        <td>
          
    <button
    type='button'
    class='btn btn-primary'
    data-bs-toggle='modal'
    data-bs-target='#staticBackdrop'
  >
Update
  </button>        
       </td>
    </tr>";
  }
}

// <td><button class='btn btn-danger' onclick='EditData({$row['movieid']})'>Edit/button></td>