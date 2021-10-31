"use strict";

const btnBuscarTrago = document.getElementById("btn--buscarTrago");
const inputTrago = document.getElementById("input--tragos");
let contenedorTrago = document.querySelector(".trago--tarjeta");
function renderTrago(data) {
  contenedorTrago.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__trago--individual">
    <div class="container__img--trago">
      <img src="${data.strDrinkThumb}" alt="" />
    </div>
    <div>
      <p class="nombre-trago">${data.strDrink}</p>
      <p>
        <ul id="${data.idDrink}" class="ingredientes">

        </ul>
      </p>
      <p class="receta"> ${data.strInstructions}</p>
    </div>
  </div>
  `
  );
}
function renderError() {
  const containerErr = document.getElementById("container-errorMsj");
  containerErr.innerHTML = `<p class="mensaje-de-error">El cocktail seleccionado no se encuentra en nuestra base de datos. </p>`;
}

function getTrago(trago) {
  fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${trago}`)
    .then((response) => response.json())
    .then((data) => {
      let arrayTragos = data.drinks;
      const tempArray = arrayTragos.map((obj) =>
        Object.keys(obj)
          .filter((e) => obj[e] !== null)
          .reduce((o, e) => {
            o[e] = obj[e];
            return o;
          }, {})
      );

      arrayTragos = tempArray;

      for (let i = 0; i < tempArray.length; i++) {
        renderTrago(tempArray[i]);
        const ingredientes = [
          tempArray[i].strIngredient1 || "",
          tempArray[i].strIngredient2 || "",
          tempArray[i].strIngredient3 || "",
          tempArray[i].strIngredient4 || "",
          tempArray[i].strIngredient5 || "",
          tempArray[i].strIngredient6 || "",
          tempArray[i].strIngredient7 || "",
          tempArray[i].strIngredient8 || "",
          tempArray[i].strIngredient10 || "",
          tempArray[i].strIngredient11 || "",
          tempArray[i].strIngredient12 || "",
          tempArray[i].strIngredient13 || "",
          tempArray[i].strIngredient14 || "",
          tempArray[i].strIngredient15 || "",
        ];

        for (let b = 0; b < ingredientes.length; b++) {
          let contenedorIngredientes =
            document.querySelectorAll(".ingredientes");
          for (let c = 0; c < contenedorIngredientes.length; c++) {
            if (
              contenedorIngredientes[c].id === tempArray[i].idDrink &&
              ingredientes[b] !== ""
            ) {
              contenedorIngredientes[c].insertAdjacentHTML(
                "beforeend",
                `<li>${ingredientes[b]}</li>`
              );
            }
          }
        }
      }
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
      renderError();
    });
}

btnBuscarTrago.addEventListener("click", function () {
  contenedorTrago.innerHTML = "";

  let trago = inputTrago.value;
  getTrago(trago);
});
