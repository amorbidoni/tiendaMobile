let itemsCarrito = document.getElementById("items-carrito");
window.onload = verItemsEnCarrito();
let carritoDeCompras;
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
function getCarritoDeCompras() {
  let obtenerCarritoDeCompras =
    JSON.parse(localStorage.getItem("carritoEnMemoria")) || [];
  if (obtenerCarritoDeCompras !== []) {
    carritoDeCompras = obtenerCarritoDeCompras;
  } else {
    carritoDeCompras = [];
  }
}
getCarritoDeCompras();

const btnCarrito = document.getElementById("btn-carrito");

btnCarrito.addEventListener("click", () => {
  window.location.href = "./carrito.html";
});

//  MOSTRAR PRODUCTOS
const productosContainer = document.getElementById("productos__container");
function renderProductos(data) {
  for (let i = 0; i < data.length; i++) {
    productosContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="producto-container">
      <div class="image-container">
        <img
        src="${data[i].image}"
        alt="biribiri reserva"
        />
      </div>
      <div class="info-producto">
        <p>${data[i].nombre}</p>
        <p>$ <span>${data[i].precio}</span></p>
        <button id="${data[i].id}" class="btn-deco btn-comprar">Comprar</button>
      </div>
    </div>
    <!--close producto--> 
  `
    );
  }

  let btnClicked = document.getElementsByClassName("btn-deco");

  for (let i = 0; i < btnClicked.length; i++) {
    btnClicked[i].addEventListener("mousedown", function () {
      btnClicked[i].classList.add("btn-clicked");
    });
    btnClicked[i].addEventListener("mouseup", function () {
      btnClicked[i].classList.remove("btn-clicked");
    });
  }
  let btnComprar = document.querySelectorAll(".btn-comprar");

  let productosEnCarrito = Number(itemsCarrito.innerText);
  //AGREGAR AL CARRITO
  function agregarAlCarrito(producto) {
    if (carritoDeCompras.includes(producto)) {
      producto.cantidadElegida += 1;
    } else {
      producto.cantidadElegida += 1;
      carritoDeCompras.push(producto);
    }
  }
  //
  for (let b = 0; b < btnComprar.length; b++) {
    btnComprar[b].addEventListener("click", () => {
      productosEnCarrito += 1;
      itemsCarrito.innerText = productosEnCarrito;
      for (let i = 0; i < data.length; i++) {
        if (btnComprar[b].id === data[i].id) {
          agregarAlCarrito(data[i]);
        }
      }
      localStorage.setItem(
        "carritoEnMemoria",
        JSON.stringify(carritoDeCompras)
      );
      localStorage.setItem =
        ("numeroEnCarrito", JSON.stringify(productosEnCarrito));
    });
  }
}
let pathName = window.location.pathname;

fetch("../json/productos.json")
  .then((response) => response.json())
  .then((data) => {
    if (pathName === "/pages/malbec.html") {
      renderProductos(data.malbec);
    } else if (pathName === "/pages/cabernet.html") {
      renderProductos(data.cabernet);
    } else if (pathName === "/pages/byr.html") {
      renderProductos(data.blancosYRosados);
    }
  });
