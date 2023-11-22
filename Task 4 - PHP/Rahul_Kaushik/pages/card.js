


$(document).ready(() => {
    const productCard = JSON.parse(localStorage.getItem('productCard'));
    console.log(productCard);

    setProductCard();
});

function setProductCard() {

    const obj = JSON.parse(localStorage.getItem('productCard'));

    console.log(obj);
    const imageUrl = obj.image;
    const companyName = obj.companyName;
    const productName = obj.productName;
    const productPrice = obj.productPrice;
 
    console.log(imageUrl);
    console.log(companyName);
    console.log(productName);
    console.log(productPrice);
  
  
    
    const displayProductCard = $("#displayedCard")
        .html(`
        <div class="card-img" id="cardImage">
                <img src="${imageUrl}" alt="">
        </div>
        <div class="card-text d-flex flex-column justify-content-between" id="cardText">
            <div>
                <h1>${companyName}</h1>
                <h4>${productName}</h4>
                <h3>${productPrice}</h3>
            </div>
            <div class="d-flex justify-content-between align-items-end">
                <button class="btn btn-dark">Buy Now</button>
                <button class="btn btn-dark">Add To Cart</button>
            </div>
        </div>
       `);
  
    
   
};