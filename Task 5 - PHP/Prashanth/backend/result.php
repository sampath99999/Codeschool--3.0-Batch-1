<?php
// // Include your database connection code or configuration here
// // ...

// // Perform a query to fetch donation data from the database
// // Modify this query according to your database structure
// $query = "SELECT * FROM donations";
// $result = pg_query($connection, $query);

// if (!$result) {
//     die("Error in SQL query: " . pg_last_error());
// }

// // Build an HTML table with the fetched data
// $htmlTable = '<table border="1">
//                 <tr>
//                     <th>Donation ID</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                     <!-- Add other table headers as needed -->
//                 </tr>';

// while ($row = pg_fetch_assoc($result)) {
//     $htmlTable .= '<tr>
//                       <td>' . $row['donation_id'] . '</td>
//                       <td>' . $row['amount'] . '</td>
//                       <td>' . $row['date'] . '</td>
//                       <!-- Add other table cells as needed -->
//                    </tr>';
// }

// $htmlTable .= '</table>';

// // Return the HTML table
// echo $htmlTable;

// // Close the database connection
// pg_close($connection);
// ?>



<!-- // Replace these values with your actual database connection details
$host = "your_host";
$port = "your_port";
$dbname = "your_database";
$user = "your_user";
$password = "your_password";

// Establish a connection to the database
$connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$connection) {
    die("Error: Unable to connect to the database");
} -->


$pdo = connect();
// Perform a query to fetch donation data from the database
$query = "SELECT * FROM donations";
$result = pg_query($connection, $query);

if (!$result) {
    die("Error in SQL query: " . pg_last_error($connection));
}

// Build an HTML table with the fetched data
$htmlTable = '<table border="1">
                <tr>
                    <th>Donation ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <!-- Add other table headers as needed -->
                </tr>';

while ($row = pg_fetch_assoc($result)) {
    $htmlTable .= '<tr>
                      <td>' . $row['donation_id'] . '</td>
                      <td>' . $row['amount'] . '</td>
                      <td>' . $row['date'] . '</td>
                      <!-- Add other table cells as needed -->
                   </tr>';
}

$htmlTable .= '</table>';

// Return the HTML table
echo $htmlTable;


