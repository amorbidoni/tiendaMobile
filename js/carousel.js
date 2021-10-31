"use strict";
const slider = document.getElementById("slider");
let carouselItem = document.querySelectorAll(".carousel-item");
let carouselItemLast = carouselItem[carouselItem.length - 1];

// slider.insertAdjacentElement("afterbegin", carouselItemLast);

function next() {
  let carouselItemFirst = document.querySelectorAll(".carousel-item")[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement("beforeend", carouselItemFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}
let interval = setInterval(() => {
  next();
}, 4000);

//primero lo hice con callbacks sin encadenar, despues lo hice encadenando

// $("#icono-instagram").slideDown(1000, function () {
//   $("#icono-instagram").fadeOut(500, function () {
//     $("#icono-instagram").fadeIn(1000, function () {
//       $("#icono-instagram").animate();
//     });
//   });
// });

$("#icono-instagram")
  .slideDown(1000)
  .delay(1000)
  .fadeOut(1000)
  .fadeIn(1000)
  .delay(1000)
  .animate({ width: "55px", fill: "#f29f3d !important" }, 500)
  .animate({ width: "43px" }, 500);
