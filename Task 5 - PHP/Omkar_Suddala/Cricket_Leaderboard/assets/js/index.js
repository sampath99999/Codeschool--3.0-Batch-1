var productCards='';
var T20WorldCup='';
var k=0;
var j=10;
$.ajax({

    url: "http://localhost/Cricket_Leaderboard/api/leaderboard.php",
    type: "GET",
    success: function (response) {
    var products = JSON.parse(response);
    console.log(products.data.result);
    var product=products.data.result;
    for (i = 0; i < product.length; i++) {
     productCards += `
     <tr ><td class="text-light">${product[i].match_id}</td>
       <td class="text-light">${product[i].matchname}</td>
       <td> <button
       type="button"
       class="btn btn-primary"
       data-bs-toggle="modal"
       data-bs-target="#${product[i].matchname}"
     >
       LeaderBoard
     </button></td>
       </tr>
     <hr/>
     `;
    $("#teamname").html(productCards);
  
   
    
    i=i+j;
    if(k==0){
while(k<11){
        T20WorldCup +=`
    <tr>
    <td>${product[k].username}</td>
    <td>${product[k].score}</td>
    <td>${product[k].player_rank}</td></tr>
    `;
    k++
    }
    $('#TWorldCup').html(T20WorldCup);
}
if(k==11){
    var ODISeries='';
    while(k<22){
        ODISeries +=`
        <tr>
        <td>${product[k].username}</td>
        <td>${product[k].score}</td>
        <td>${product[k].player_rank}</td></tr>
        `;
        k++
        }
        $('#ODISeries').html(ODISeries);
    }
    if(k==22){
        var TestMatch='';
        while(k<33){
            TestMatch +=`
            <tr>
    <td>${product[k].username}</td>
    <td>${product[k].score}</td>
    <td>${product[k].player_rank}</td></tr>
            `;
            k++
            }
            $('#Test-Match').html(TestMatch);
        }
        if(k==33){
            var World_Test_Championship='';
            while(k<44){
                World_Test_Championship +=`
                <tr>
                <td>${product[k].username}</td>
                <td>${product[k].score}</td>
                <td>${product[k].player_rank}</td></tr>
                `;
                k++
                }
                $('#WorldTestChampionship').html(World_Test_Championship);
            }
     
    }
    },
    error: function () {
    console.log("401 error");
    },
    });