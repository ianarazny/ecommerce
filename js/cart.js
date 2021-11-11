//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
"use: strict";


let comissionPercentage = 0.15;
let costXcount = 0;

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
                    <input id="premiumRadio" name="publicationType" type="radio" class="custom-control-input" checked=""
                required="">
                    <label class="custom-control-label" for="premiumRadio">Premium (2-5 días) - Costo del 15% sobre el subtotal.</label>
                </div>
                <div class="custom-control custom-radio">
                    <input id="expressRadio" name="publicationType" type="radio" class="custom-control-input" required="">
                    <label class="custom-control-label" for="expressRadio">Express (5-8 días) - Costo del 7% sobre el subtotal.</label>
                </div>
                <div class="custom-control custom-radio">
                    <input id="standardRadio" name="publicationType" type="radio" class="custom-control-input" required="">
                    <label class="custom-control-label" for="standardRadio">Standard (12 a 15 días) - Costo del 5% sobre el subtotal.</label>
                </div>
                </div>
                </div>

            <ul>
                <li>
                    <input type="submit" class="btn" value="Eliminar">
                </li>

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
            <td><input class="form-control" type="number" min="1" id="cantidad" name="cantidad" value="${carrito.count}" ></td>
            <td id="subtotal">${carrito.unitCost * carrito.count}</td>
        </tr>
        `
    }
    document.getElementById("losObjetos").innerHTML = htmlContentToAppend;
}

function cambioAsinc(precio) {

    let unitProductCostHTML = document.getElementById("subtotal");
    let totalCostHTML = document.getElementById("total");
    let quantity = document.getElementById("cantidad");
    let comission = document.getElementById("comissionText")

    let costXcount = precio * quantity.value;
    let totalCostToShow = (Math.round(costXcount * comissionPercentage * 100) / 100) + costXcount;
    let comissionToShow = (Math.round(costXcount * comissionPercentage * 100) / 100);

    comission.innerHTML = `$U ` + comissionToShow;
    unitProductCostHTML.innerHTML = `$U ` + costXcount;
    totalCostHTML.innerHTML = `Total:` + `$U ` + totalCostToShow;


}


// function ValidateCreditCardNumber() {

//     var ccNum = document.getElementById("cardNum").value;
//     var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
//     var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
//     var santanderRegEx = /^(?:3[47][0-9]{13})$/;
//     var brouRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
//     var isValid = false;

//     if (visaRegEx.test(ccNum)) {
//         isValid = true;
//     } else if (mastercardRegEx.test(ccNum)) {
//         isValid = true;
//     } else if (santanderRegEx.test(ccNum)) {
//         isValid = true;
//     } else if (brouRegEx.test(ccNum)) {
//         isValid = true;
//     }

//     if (isValid) {
//         alert("Gracias por su compra");
//     } else {
//         alert("Por favor, revise que los datos de su tarjeta sean correctos.");
//     }
// }

function creditForm() {
    let creditForm = document.getElementById('addCreditForm');
    let transactionForm = document.getElementById('addTransactionForm');

    let htmlContentToAppend = "";
    htmlContentToAppend += `

              <label>Compañía de la tarjeta: </label><br>
              <input type="radio" name="payment" value="Visa" id="visa" checked="">Visa &nbsp;
              <input type="radio" name="payment" value="Master Card" required="">Master Card &nbsp;
              <input type="radio" name="payment" value="American Express" required="">Brou &nbsp;
              <input type="radio" name="payment" value="Discover" required="">Santander <br><br>

              <label id="cardNum">Número de tarjeta:</label>
              <input type="number" min="0" name="cardNumber" id="cardNum" size="30" placeholder="Ingrese número de tarjeta."
                onchange=ValidateCreditCardNumber() required>

              <label for="start">Fecha de vencimiento de la tarjeta: </label>

              <input type="date" id="start" name="trip-start" value="2021-11-11" min="2021-11-11" max="2025-12-31">
    `
    creditForm.innerHTML = htmlContentToAppend;
    transactionForm.innerHTML = "";

}

function transForm() {
    let creditForm = document.getElementById('addCreditForm');
    let transactionForm = document.getElementById('addTransactionForm');

    let htmlContentToAppend = "";
    htmlContentToAppend += `

    <label for="cardNum">Numero de cuenta:</label>
    <input type="number" class="form-control" id="cardNum" placeholder="Ingrese numero de cuenta" required>
    <div class="invalid-feedback">Por favor, complete este campo</div>
    
    `
    creditForm.innerHTML = "";
    transactionForm.innerHTML = htmlContentToAppend;

}


function validation() {

    let name = document.getElementById('nameOfBuyer');
    let address = document.getElementById('inputAddress');
    let cardNum = document.getElementById('cardNum');

    if (!name.value) {
        alert('Por favor, corrobore haber puesto su nombre');
        $('.alert').alert()
    }
    else if (!address.value) {
        alert('Por favor, corrobore haber puesto la dirección completa y correctamente');
    }
    else if (!cardNum.value) {
        alert('Por favor, corrobore haber puesto el método de pago y número correspondiente')
    }

    else {
        alert('Gracias por su compra =)')
    }
}


document.addEventListener("DOMContentLoaded", function (e) {



    getJSONData(CART_INFO_URL).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                carro = resultObj.data;

                document.getElementById('total').innerHTML += `${carro.articles[0].unitCost * carro.articles[0].count} `;

                showCart(carro.articles);
                agregarALaTabla(carro.articles);
                console.log(carro.articles[0].unitCost)

                let arr = []
                arr = carro.articles;
                //Esto lo hago por si tuviese más de un objeto en el array

                document.getElementById("cantidad").addEventListener("change", function () {
                    //Cuando cambie la info del input quiero actualizar la cte productCost 
                    for (let i = 0; i < arr.length; i++) {
                        costXcount = carro.articles[i].unitCost;
                        cambioAsinc(carro.articles[i].unitCost);
                    }
                });

                document.getElementById("premiumRadio").addEventListener("change", function () {
                    for (let i = 0; i < arr.length; i++) {
                        //Si clickeo en este botón, actualizo el porcentaje y ejecuto la función
                        comissionPercentage = 0.15;
                        cambioAsinc(carro.articles[i].unitCost);
                    }
                });

                document.getElementById("expressRadio").addEventListener("change", function () {
                    for (let i = 0; i < arr.length; i++) {
                        comissionPercentage = 0.07;
                        cambioAsinc(carro.articles[i].unitCost);
                    }
                });

                document.getElementById("standardRadio").addEventListener("change", function () {
                    for (let i = 0; i < arr.length; i++) {
                        comissionPercentage = 0.05;
                        cambioAsinc(carro.articles[i].unitCost);
                    }
                });
                for (let i = 0; i < arr.length; i++) {
                    cambioAsinc(carro.articles[i].unitCost);
                }

            }
        }
    )
});


