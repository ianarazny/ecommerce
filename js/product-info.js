//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


// var arrayProducto = [];

// function showProductList() {
//     let htmlContentToAppend = "";
//     for (let i = 0; i < arrayProducto.length; i++) { //Señalo de qué manera voy a recorrer el array
//         let product = arrProductos[i];

//         htmlContentToAppend += `
//                 <div class="list-group-item list-group-item-action"> 
//                     <div class="row">
//                         <div class="col-3">
//                             <img src="` + product.imagenes + `" alt="` + product.description + `" class="img-thumbnail">
//                         </div>
//                         <div class="col">
//                             <div class="d-flex w-100 justify-content-between">
//                                 <h4 class="mb-1">`+ product.name + `</h4>
//                                 <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
//                             </div>
//                             <p class="mb-1">` + `Descripción: ` + product.description + `</p>
//                             <p class="mb-1">` + `Costo: ` + product.cost + `</p>
//                             <p class="mb-1">` + `Moneda: ` + product.currency + `</p>
//                         </div>
//                     </div>
//                 </div>
//                 `
//     }
//     document.getElementById("prod-container").innerHTML = htmlContentToAppend;
// }

// document.addEventListener("DOMContentLoaded", function (e) {
//     getJSONData(PRODUCT_INFO_URL).then( //Accedo a la lista de productos con una petición al servidor.
//         function (resultObj) {
//             if (resultObj.status === "ok") {  //Si está todo bien entonces...
//                 var producto = resultObj.data; //... le asigno a la variable productos su respectiva información, extraída del registro del url productos
//                 showProductList(producto);
//             }
//         });
// });

//


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="OnixImage`+ [i+1] +`" >
            </div>
        </div>
        `

        document.getElementById("carImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(arr) {
    let htmlContentToAppend = "";

    for(let i=0; i < arr.length; i++){
        let prodRel = arr[i];

        htmlContentToAppend += ` 
        <div class="">
                <a href="`+ prodRel +`">
        </div>
        `

        document.getElementById("productoRelacionado").innerHTML = htmlContentToAppend;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(
        function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            console.log("Entré al if");

            let productName  = document.getElementById("categoryName");
            let productDescription = document.getElementById("categoryDescription");
            let productCost = document.getElementById("productCost");
            let productCurrency = document.getElementById("productCurrency");
            let productCategory = document.getElementById("productCategory");
            let productCountHTML = document.getElementById("productsoldCount");

            
            productName.innerHTML = product.name;    
            productDescription.innerHTML = product.description;
            productCost.innerHTML = product.cost;
            productCurrency.innerHTML = product.currency;          
            productCountHTML.innerHTML = product.soldCount;
            productCategory.innerHTML = product.category;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Productos relacionados;
            showRelatedProducts(product.relatedProducts);
        }
    });
});