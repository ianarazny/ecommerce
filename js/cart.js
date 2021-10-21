//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
"use: strict";



function showCart(arreglo) {
    let htmlContentToAppend = "";
    for (let i = 0; i < arreglo.length; i++) {
        let carrito = arreglo[i];

        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                        <div class="col-3">
                            <img src=" ${carrito.src} " class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1"> ${carrito.name} </h4>
                            </div>
                            
                            <p class="mb-1">Costo de la unidad: ${carrito.unitCost}</p>
                            <p class="mb-1">Moneda: ${carrito.currency}</p>
                        </div>
                </div>
                 <div>     

                <div id="subtotales"></div>               
                <p class="mb-1">Cantidad pre-seleccionada: </p>
                <p> ${carrito.count}</p>
                <p class="mb-1">Subtotal de este producto según cantidad pre-seleccionada: </p>      
                <p> ${carrito.unitCost * carrito.count}</p>


            <div class="d-block my-3">
            <h5>Tipo de envío:</h5>
            <div class="custom-control custom-radio">
              <input id="express" name="publicationType" type="radio" class="custom-control-input" checked=""
                required="">
              <label class="custom-control-label" for="express">Premium (2-5 días) - Costo del 15% sobre el subtotal.</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="comun" name="publicationType" type="radio" class="custom-control-input" required="">
              <label class="custom-control-label" for="comun">Express (5-8 días) - Costo del 7% sobre el subtotal.</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="standardradio" name="publicationType" type="radio" class="custom-control-input" required="">
              <label class="custom-control-label" for="standardradio">Standard (12 a 15 días) - Costo del 5% sobre el subtotal.</label>
            </div>
          </div>
             </div>

                <ul>
                <li>
                <input type="submit" class="btn" value="Eliminar">
                </li>
                <li>
                <input type="submit" class="btn" value="Comprar ahora">
                </li>
                <li>
                <input type="submit" class="btn" value="Método de pago">
                </li>
              </ul>
                </div>
             
        `
    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
}


function agregarALaTabla(arr) {
    let htmlContentToAppend = "";
    for (let i = 0; i < arr.length; i++) {
        let carrito = arr[i];

        htmlContentToAppend += `
        <tr>
            <th scope="row"></th>
            <td>${carrito.name}</td>
            <td><input class="form-control" type="number" min="1" id="cantidad" name="cantidad" value="${carrito.count}" onchange="cambioAsinc(${carrito.unitCost})"></td>
            <td id="subtotal">${carrito.unitCost * carrito.count}</td>
        </tr>
        `
    }
    document.getElementById("losObjetos").innerHTML = htmlContentToAppend;
}

function cambioAsinc(precio) {

    document.getElementById('subtotal').innerHTML = document.getElementById('cantidad').value * precio;
    document.getElementById('total').innerText = `Total:  ` + document.getElementById('cantidad').value * precio;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                carro = resultObj.data;

                document.getElementById('total').innerHTML += `${carro.articles[0].unitCost * carro.articles[0].count} `;

                showCart(carro.articles);
                agregarALaTabla(carro.articles);
            }
        }
    )
});


