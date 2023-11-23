
<?php


require("./utils/connection.php"); 
        
        if ($_SERVER["REQUEST_METHOD"] !== "GET") {
            sendResponse(false, "Invalid request method");
        }
       $pdo=connect();
      
            $query = 'SELECT * FROM dates';
            $stmt = $pdo->prepare($query);
        
            $stmt->execute();
        
            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($user);
            }
        
      
    
       
        
?>
