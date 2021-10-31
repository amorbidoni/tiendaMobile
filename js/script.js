"use strict";

// navegacion
let itemsCarrito = document.getElementById("items-carrito");
$("#btn-cocktails").on("click", () => {
  $(location).prop("href", "pages/tragos.html");
});
$("#btn-cabSau").on("click", () => {
  $(location).prop("href", "pages/cabernet.html");
});
$("#btn-byr").on("click", () => {
  $(location).prop("href", "pages/byr.html");
});
//
window.onload = verItemsEnCarrito();

function verItemsEnCarrito() {
  let obtenerCarritoDeCompras =
    JSON.parse(localStorage.getItem("carritoEnMemoria")) || [];
  if (obtenerCarritoDeCompras !== []) {
    let totalItemsCarrito = obtenerCarritoDeCompras.reduce(
      (currentTotal, producto) => {
        return producto.cantidadElegida + currentTotal;
      },
      0
    );
    itemsCarrito.innerText = totalItemsCarrito;
  } else {
    itemsCarrito.innerText = 0;
  }
}

// Navegación
const btnMalbec = document.getElementById("btn-malbec");
btnMalbec.addEventListener("click", function () {
  window.location.href = "pages/malbec.html";
});

const navBtn = document.querySelectorAll(".container__navBtn");

for (let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("mousedown", function () {
    navBtn[i].classList.toggle("btn-pressed-navBar");
  });
  navBtn[i].addEventListener("mouseup", function () {
    navBtn[i].classList.toggle("btn-pressed-navBar");
  });
}

const btnCarrito = document.getElementById("btn-carrito");

btnCarrito.addEventListener("click", () => {
  window.location.href = "pages/carrito.html";
});
