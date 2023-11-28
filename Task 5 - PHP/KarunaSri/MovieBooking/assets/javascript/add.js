$(document).ready(function () {
  $(".add_movie_btn").click(function (e) {
    e.preventDefault();
    alert("HelloAAA");
    $("#show_item").prepend(`<div class="row append_items">
                                    <div class="col-md-4 mb-3">
                                        <input type="text" name="movie_name[]" class="form-control" placeholder="Movie Name" required>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <input type="text" name="genre_type[]" class="form-control" placeholder="Genre _Type" required>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <input type="text" name="theater_name[]" class="form-control" placeholder="Theater Name" required>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <button class="btn btn-danger remove_movie_btn">Remove</button>
                                    </div>
                                </div>`);
  });
  $(document).on("click", ".remove_movie_btn", function (e) {
    e.preventDefault();
    alert("HelloRR");
    let row_item = $(this).parent().parent();
    row_item.remove();
  });
  alert("Hello1");
  $("#add_form").submit(function (e) {
    alert("HelloSSS");
    e.preventDefault();
    $("add_btn").val("Addinggg...");
    $.ajax({
      url: "http://localhost/MOVIEBOOKING/api/add.php",
      method: "POST",
      data: $("#add_form").serialize(),
      success: function (response) {
        alert(Hello2);
        $("#add_btn").val("Add");
        $("#add_form")[0].reset();
        $(".append_items").remove();
        $("#show_alert").html(
          `<div class="alert alert-success" role="alert">${response}</div>`
        );
      },
      error: (response) => {
        console.log(response);
      },
    });
  });
}); //closing of ready function
