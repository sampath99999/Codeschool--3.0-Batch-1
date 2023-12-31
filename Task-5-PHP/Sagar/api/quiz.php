<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Dashboard</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="./css/style.css">
</head>

<body>

  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-warning ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">QUIZ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link  fw-bold" aria-current="page" href="#">HOME</a>
          </li>
          <li class="nav-item fw-bold">
            <a class="nav-link" href="#">GO BACK</a>
          </li>


        </ul>

      </div>
    </div>
  </nav>


  <div class="container mt-5 ">
    <div class="text-center">
     <strong>PHP QUIZZER</strong> 
    </div>

     <main>
      <div class="menu text-center mt-5">
       <button class="btn btn-primary  "><a class="text-light text-decoration-none " href="main.php">Take Quiz</a></button> 
       <button class="btn btn-primary"><a class="text-light text-decoration-none " href="add.php">Add Questions</a></button> 
      </div>
     </main>





</body>

</html>