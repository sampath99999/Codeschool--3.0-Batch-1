// Call the retrieve function when the document is ready
    let day = '';
    let month='';
    let year='';
    $(document).ready(function(){
      $.ajax({
        url: "./api/date.php",
        type: "GET",
        dataType: "json",
        success:function(product){
            console.log(product);
            // products.forEach(product => {
            //     console.log(product);
                
            //});
            for( j=0;j<=11;j++){
            month += `<option value='${product[j].months}'>${product[j].months}</option>`;
            };
            for( i=0;i<product.length;i++){
               
            day += `<option  value='${product[i].days}'>${product[i].days}</option>`;
            };
            for( k=0;k<product.length;k++){
               
            year += `<option value='${product[k].years}'>${product[k].years}</option>`;
          };
          $('#day').html(day);
          $('#month').html(month);
          $('#year').html(year);



        },
        error: function (error) {
          console.error("Error fetching data:", error);
        }
    });
});