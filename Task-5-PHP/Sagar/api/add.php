<?php
  require("./utils/functions.php");

  if ($_SERVER["REQUEST_METHOD"] != "POST") {
      sendResponse(false, "Invalid request method");
  }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP QUIZ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>

       <style>
      
      #questionnumber {
        margin-right: 182px;
        width:70px;

      }

      #question-text{
        margin-right: -76px;
        width: 300px;
      }
      #cchoice{
        margin-right: 103px;
      }

      input{
        border: 1px solid black;
        border-radius: 4px;
      }

       </style>
</head>

<body>

<div class="text-center">
<div class="container text-center mt-5">
       <h4>PHP QUIZER</h4> 
    </div>


<div class="container text-center mt-3">
    <h4 class="mb-3">Add A QUESTION</h4>
    <form action="add.php" method="post">
        <p>
            <label>Question Number:</label>
            
            <input type="number" id="questionnumber" name="question_number" value="">

        </p>

        <p>
            <label>Question Text:</label>
            <input id="question-text" type="text" name="question_text">

        </p>

        <p>
            <label>Choice 1:</label>
            <input type="text" name="choice1">

        </p>

        <p>
            <label>Choice 2:</label>
            <input type="text" name="choice2">
        </p>

        <p>
            <label>Choice 3:</label>
            <input type="text" name="choice3">
        </p>

        <p>
            <label>Choice 4:</label>
            <input type="text" name="choice4">
        </p>

        <p>
            <label>Correct Option Number:</label>
            <input id="cchoice" type="number" name="correct_choice">
        </p>

        <input id="submit" type="submit" name="submit" value="submit">
    </form>
</div>

</div>
</body>
   

</html>