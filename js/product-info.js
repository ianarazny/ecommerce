//Creo una función que recorra el array de manera que le asigne a cada imágen un lugar correcto en el html
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="OnixImage` + [i + 1] + `" >
            </div>
        </div>
        `

        document.getElementById("carImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Declaro la función que recorrerá el array de manera que pueda mostrar los comentarios
function showComments(arreglo) {
    let htmlContentToAppend = "";

    for (let j = 0; j < arreglo.length; j++) {

        let product_comment = arreglo[j];

        htmlContentToAppend += `
    <div class="list-group-item list-group-item-action"> 
        <div class="row">
            <div class="col-3">
                <p>Puntuación: `+ product_comment.score + `</p>
            </div>  
            <div class="col-6">              
                <p>Comentario: `+ product_comment.description + `</p>
                <p>Usuario: ` + product_comment.user + ` </p>
                <small class="text-muted">Fecha del envío: ` + product_comment.dateTime + ` </small>
            </div>
        </div>
    </div>  
    `
    }

    document.getElementById("commentSection").innerHTML = htmlContentToAppend;
}

function showProducts(arreglo) {
    let htmlContentToAppend = "";

    for (let i = 0; i < arreglo.length; i++) {

        let producto = arreglo[i];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
    <div class="list-group-item list-group-item-action"> 
        <div class="row">
            <div class="col-3">
                <p>Nombre: `+ producto.name + `</p>            
                <img src="` + producto.imgSrc + `" class="img-thumbnail"> 
            </div>  
            <div class="col-6">
            <div class="d-flex w-100 justify-content-between">            

            <small class="text-muted">Número de vendidos: ` + producto.soldCount + ` </small>
            </div>
                <p>Descripción: `+ producto.description + `</p>
                <p>Costo: ` + producto.cost + ` </p>
                <p>Moneda: `+ producto.currency + `</p>
            </div>

        </div>
    </div>  </a>
    `
    }
    document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function (e) {

    // const promesas = async () => {
    //     const productInfo = await getJSONData(PRODUCT_INFO_URL);

    //     const productos = await getJSONData(PRODUCTS_URL);
    // }

    getJSONData(PRODUCT_INFO_URL).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                product = resultObj.data;

                //Corroboro que la petición esté realizada de manera correcta.
                console.log("Entré al if");

                let productName = document.getElementById("productName");
                let productDescription = document.getElementById("productDescription");
                let productCost = document.getElementById("productCost");
                let productCurrency = document.getElementById("productCurrency");
                let productCount = document.getElementById("productsoldCount");
                let productCategory = document.getElementById("productCategory");

                arregloDeProductosRelacionados = product.relatedProducts;
                productName.innerHTML = product.name;
                productDescription.innerHTML = product.description;
                productCost.innerHTML = product.cost;
                productCurrency.innerHTML = product.currency;
                productCount.innerHTML = product.soldCount;
                productCategory.innerHTML = product.category;


                //Invoco a la función que mostrará las imágenes de los autos
                showImagesGallery(product.images);


                getJSONData(PRODUCTS_URL).then(
                    function (otrosProductos) {
                        if (otrosProductos.status === "ok") {
                            let arreglo = [];
                            for (let i = 0; i < product.relatedProducts.length; i++) {
                                arreglo.push(otrosProductos.data[product.relatedProducts[i]]);
                            }
                            showProducts(arreglo);
                            // le tengo que pasar la posicion de los productos relacionados
                            // Entonces cargo un arreglo con la información de las posiciones indicadas en el arreglo de relatedProducts
                            console.log("Entrado");

                        };
                    }
                );
            };
        }
    );


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(
        function (comentarios) {
            if (comentarios.status === "ok") {

                //Nuevamente corrobor que la petición esté realizada de manera correcta.
                console.log("Hice la petición?");

                var product_comment = comentarios.data;
                showComments(product_comment);
            }
        }
    );



    document.getElementById("comentarioEnviado").addEventListener("click", function (e) {

        alert("Gracias por su comentario!");

    });
    //Llamo la información de la URL de productos.

});
