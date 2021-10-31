"use strict";
let itemsCarrito = document.getElementById("items-carrito");
window.onload = verCarrito();
function verCarrito() {
  let obtenerCarritoDeCompras =
    JSON.parse(localStorage.getItem("carritoEnMemoria")) || [];
  if (obtenerCarritoDeCompras !== []) {
    function verProductos() {
      limpiarHtml();

      for (let i = 0; i < obtenerCarritoDeCompras.length; i++) {
        let contenedorProdCarrito = document.createElement("div");
        obtenerCarritoDeCompras[i].subtotal =
          obtenerCarritoDeCompras[i].cantidadElegida *
          obtenerCarritoDeCompras[i].precio;
        function mostrarProductoElegido(cantidad, subtotal) {
          contenedorProdCarrito.innerHTML = `
          <div id="producto-${obtenerCarritoDeCompras[i].id}" class="producto__carrito">
              <div class="container__img">
                  <img src="${obtenerCarritoDeCompras[i].image}" alt="" />
              </div>
              <div class="container__info--compra">
                  <p class="producto">${obtenerCarritoDeCompras[i].nombre}</p>
                  <div class="calculador__compra">
                  <p>
                      <span id="cantidad-${obtenerCarritoDeCompras[i].id}" class="cantidadProducto">${cantidad}</span> X $<span id="subtotal-${obtenerCarritoDeCompras[i].id}"
                      class="precio__total--producto"
                      >${subtotal}</span
                      >
                  </p>
                  <div class="controllers--carrito">
                      <button id="${obtenerCarritoDeCompras[i].id}" class="btn__compra--deco btn-restarProducto">
                        <img src="../images/minus.svg" alt="restar producto" />
                      </button>
                      <button class="btn__compra--deco btn-sumarProducto">
                        <img src="../images/plus.svg" alt="sumar producto" />
                      </button>
                      <button data-id="${obtenerCarritoDeCompras[i].id}" class="btn__compra--deco btn-borrarTodo">
                        <img src="../images/trash-alt.svg" alt="borrar todo" />
                      </button>
                  </div>
                  </div>
              </div> 
              </div>
          `;
        }
        //LIMPIAR HTML

        const productosCarrito = document.getElementById("productos__carrito");
        mostrarProductoElegido(
          obtenerCarritoDeCompras[i].cantidadElegida,
          obtenerCarritoDeCompras[i].subtotal
        );
        productosCarrito.appendChild(contenedorProdCarrito);
      }
      function limpiarHtml() {
        const productosCarrito = document.getElementById("productos__carrito");
        while (productosCarrito.firstChild) {
          productosCarrito.removeChild(productosCarrito.firstChild);
        }
      }
    }

    verProductos();
    //TOTAL DE ITEMS EN CARRITO
    let totalItemsCarrito;
    function getTotalItemsCarrito() {
      totalItemsCarrito = obtenerCarritoDeCompras.reduce(
        (currentTotal, producto) => {
          return producto.cantidadElegida + currentTotal;
        },
        0
      );
    }
    getTotalItemsCarrito();

    //CALCULAR TOTAL $ CARRITO
    let totalCarrito = 0;
    function calcularTotalCarrito() {
      totalCarrito = obtenerCarritoDeCompras.reduce(
        (currentTotal, producto) => {
          return producto.subtotal + currentTotal;
        },
        0
      );
    }
    calcularTotalCarrito();
    itemsCarrito.innerText = totalItemsCarrito;

    //CALCULAR  Y MOSTRAR TOTALES $
    const totalCompra = document.getElementById("total__compra");
    const descuentoContainer = document.getElementById("descuento");

    function calcularTotales() {
      if (totalItemsCarrito >= 6) {
        aplicarDescuento(totalCarrito);
      } else {
        totalCompra.innerHTML = `<p>Total Compra: $<span id="total-carrito">${totalCarrito}</span></p>`;
        descuentoContainer.innerHTML =
          "10% de descuento llevando 6 unidades o mas!";
      }

      function aplicarDescuento(total) {
        descuentoContainer.innerHTML = `<p>10% de descuento = -$${
          total * 0.1
        }</p>`;
        totalCompra.innerHTML = `<p>Total Compra:<span id="precio-anterior" class="precio-anterior">$${total}</span> $<span id="total-carrito">${
          totalCarrito - total * 0.1
        }</span></p>`;
      }
    }
    calcularTotales();
    //MODIFICAR PRODUCTOS EN CARRITO
    function modificarSeleccionados(cantidad, subtotal, id) {
      let containerCantidad = document.getElementById("cantidad-" + id);
      let containerSubtotal = document.getElementById("subtotal-" + id);
      let containerTotalCarrito = document.getElementById("total-carrito");
      containerCantidad.innerText = cantidad;
      containerSubtotal.innerText = subtotal;
      containerTotalCarrito.innerText = totalCarrito;
    }
    function cargarEventos() {
      itemsCarrito.innerText = totalItemsCarrito;
      // RESTAR PRODUCTOS
      let btnRestarProducto = document.querySelectorAll(".btn-restarProducto");
      for (let i = 0; i < btnRestarProducto.length; i++) {
        btnRestarProducto[i].addEventListener("click", function () {
          $("#items-carrito").text(`${Number(itemsCarrito.innerText) - 1}`);
          obtenerCarritoDeCompras[i].cantidadElegida -= 1;
          obtenerCarritoDeCompras[i].subtotal =
            obtenerCarritoDeCompras[i].cantidadElegida *
            obtenerCarritoDeCompras[i].precio;
          totalCarrito = obtenerCarritoDeCompras.reduce(
            (currentTotal, producto) => {
              return producto.subtotal + currentTotal;
            },
            0
          );
          if (obtenerCarritoDeCompras[i].cantidadElegida === 0) {
            obtenerCarritoDeCompras.splice(i, 1);
            verProductos();
          }
          modificarSeleccionados(
            obtenerCarritoDeCompras[i].cantidadElegida,
            obtenerCarritoDeCompras[i].subtotal,
            obtenerCarritoDeCompras[i].id
          );

          totalItemsCarrito = Number(itemsCarrito.innerText);
          productosEnMemoria();
          calcularTotales();
        });
      }
      //SUMAR PRODUCTOS

      let btnSumarProducto = document.querySelectorAll(".btn-sumarProducto");
      for (let i = 0; i < btnSumarProducto.length; i++) {
        btnSumarProducto[i].addEventListener("click", function () {
          $("#items-carrito").text(`${Number(itemsCarrito.innerText) + 1}`);
          obtenerCarritoDeCompras[i].cantidadElegida += 1;
          obtenerCarritoDeCompras[i].subtotal =
            obtenerCarritoDeCompras[i].cantidadElegida *
            obtenerCarritoDeCompras[i].precio;
          totalCarrito = obtenerCarritoDeCompras.reduce(
            (currentTotal, producto) => {
              return producto.subtotal + currentTotal;
            },
            0
          );
          modificarSeleccionados(
            obtenerCarritoDeCompras[i].cantidadElegida,
            obtenerCarritoDeCompras[i].subtotal,
            obtenerCarritoDeCompras[i].id
          );
          totalItemsCarrito = Number(itemsCarrito.innerText);
          productosEnMemoria();
          calcularTotales();
        });
      }
      //  BORRAR PRODUCTO DEL CARRITO

      let btnEliminarProducto = document.querySelectorAll(".btn-borrarTodo");
      for (let i = 0; i < btnEliminarProducto.length; i++) {
        btnEliminarProducto[i].addEventListener("click", function () {
          let cursoId = btnEliminarProducto[i].getAttribute("data-id");
          obtenerCarritoDeCompras = obtenerCarritoDeCompras.filter(
            (data) => data.id !== cursoId
          );
          getTotalItemsCarrito();
          calcularTotalCarrito();
          calcularTotales();
          verProductos();
          productosEnMemoria();
          cargarEventos();
        });
      }
    }
    //ELIMINAR PRODUCTOS

    function productosEnMemoria() {
      localStorage.setItem(
        "carritoEnMemoria",
        JSON.stringify(obtenerCarritoDeCompras)
      );
      localStorage.setItem =
        ("numeroEnCarrito", JSON.stringify(totalItemsCarrito));
    }

    $(".btn-borrarTodo").on("click", () => {
      $("#items-carrito").text(`${0}`);
    });
    cargarEventos();
    //WHATSAPP
    // https://api.whatsapp.com/send?phone=+{{ *YOURNUMBER* }}&text=%20{{ *YOUR MESSAGE* }}
    let comprasArray = [];
    for (let i = 0; i < obtenerCarritoDeCompras.length; i++) {
      let agregarAlWp = ` ${obtenerCarritoDeCompras[i].cantidadElegida} unidades de ${obtenerCarritoDeCompras[i].nombre}`;
      comprasArray.push(agregarAlWp);
    }

    comprasArray = comprasArray.toString();
    console.log(comprasArray);

    let yourNumber = " 543513255524";
    let yourMessage = `${comprasArray} por un total de $${totalCarrito}`;

    // %20 mean space in link
    // If you already had an array then you just join them with '%20'
    // easy right

    function getLinkWhastapp(number, message) {
      number = yourNumber;
      message = yourMessage.split(" ").join("%20");

      return (
        "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + message
      );
    }
    let linkWhatsapp = getLinkWhastapp();
    let btnRealizarCompra = document.getElementById("realizar--compra");
    btnRealizarCompra.addEventListener("click", function () {
      window.open(linkWhatsapp, "_blank");
    });
  }
}
