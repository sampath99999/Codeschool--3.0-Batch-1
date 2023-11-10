// dropDownList = document.querySelector('.dropdown');
// UnorderedList = document.querySelector('.dropdown-menu');

// dropDownList.addEventListener('mouseenter', () => {
//     this.UnorderedList.style.display = 'block';
// });
// dropDownList.addEventListener('mouseleave', () => {
//     this.UnorderedList.style.display = 'none';
// });

body = document.querySelector("body");

document.querySelectorAll(".dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("mouseenter", function () {
    this.querySelector(".dropdown-menu").style.display = "block";
  });
  body.addEventListener("click", function () {
    this.querySelector(".dropdown-menu").style.display = "none";
  });
});

document.querySelectorAll(".deep-dropdown").forEach(function (deepDropDown) {
  deepDropDown.addEventListener("mouseenter", function () {
    this.querySelector(".deep-dropdown-menu").style.display = "block";
  });
  body.addEventListener("click", function () {
    this.querySelector(".deep-dropdown-menu").style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

// document.addEventListener("DOMContentLoaded", function () {
//     const filterApp = document.querySelectorAll(".filter-app");
//     const cards = document.querySelectorAll(".card");

//     filterButtons.forEach((button) => {
//         button.addEventListener("click", () => {
//             const filter = button.getAttribute("data-filter");

//
//             cards.forEach((card) => {
//                 card.style.display = "none";
//             });

//             if (filter === "all") {
//             
//                 cards.forEach((card) => {
//                     card.style.display = "block";
//                 });
//             } else {
//
//                 const filteredCards = document.querySelectorAll("." + filter);
//                 filteredCards.forEach((card) => {
//                     card.style.display = "block";
//                 });
//             }
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
 

      filterButtons.forEach((btn) => {
        if (btn === button) {
          btn.classList.add("filter-active");
        } else {
          btn.classList.remove("filter-active");
        }
      });

      cards.forEach((card) => {
        const cardCategory = card.classList.contains(filter) || filter === "*";
        card.style.display = cardCategory ? "block" : "none";
      });
    });
  });
});
