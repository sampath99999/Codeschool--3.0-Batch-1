$(document).ready(function () {
    const cartArray = [];

    const productArray = JSON.parse(localStorage.getItem('productCard'))
    const imageUrl = productArray.image;
    const companyName = productArray.companyName;
    const productName = productArray.productName;
    const productPrice = productArray.productPrice;

    cartArray.push(productArray);

    const displayCart = $("cartDisplay")
        .html(`
            <img src="${imageUrl} alt="product img"/>

        `);
    

   
})