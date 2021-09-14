let comment = [];

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
        document.getElementById("commentSection").innerHTML = htmlContentToAppend;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                product = resultObj.data;

                console.log("Entré al if");

                let productName = document.getElementById("productName");
                let productDescription = document.getElementById("productDescription");
                let productCost = document.getElementById("productCost");
                let productCurrency = document.getElementById("productCurrency");
                let productCount = document.getElementById("productsoldCount");
                let productCategory = document.getElementById("productCategory");

                productName.innerHTML = product.name;
                productDescription.innerHTML = product.description;
                productCost.innerHTML = product.cost;
                productCurrency.innerHTML = product.currency;
                productCount.innerHTML = product.soldCount;
                productCategory.innerHTML = product.category;


                //Muestro las imagenes en forma de galería
                showImagesGallery(product.images);
            }
        });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(
        function (comentarios) {
            if (comentarios.status === "ok") {
                console.log("Hice la petición?");

                var product_comment = comentarios.data;
                showComments(product_comment);
            }
        }
    )

    document.getElementById("comentarioEnviado").addEventListener("click", function (e) {

        alert("Gracias por su comentario!");
    })
});
