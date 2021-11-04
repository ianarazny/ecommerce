
const ORDER_ASC_BY_COST = "Costo crec.";
const ORDER_DESC_BY_COST = "Costo decr.";
const ORDER_BY_REL = "Relevancia";
var arrProductos = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_REL) {
        result = array.sort(function (a, b) {
            let aVendidos = parseInt(a.soldCount);
            let bVendidos = parseInt(b.soldCount);

            if (aVendidos > bVendidos) { return -1; }
            if (aVendidos < bVendidos) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < arrProductos.length; i++) { //Señalo de qué manera voy a recorrer el array
        let products = arrProductos[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {

            htmlContentToAppend += `  
                    <div class="col-md-4">
                        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                            <img class="bd-placeholder-img card-img-top" src="` + products.imgSrc + `">
                            <h3 class="m-3">Nombre:`+ products.name + ` </h3>
                            <div class="card-body">
                                <p class="card-text">Descripción: ` + products.description + `</p>
                                <p class="card-text">Costo: ` + products.cost + ` ` + products.currency + `</p>
                                <small class="text-muted">` + products.soldCount + ` artículos vendidos</small>
                            </div>
                        </a>
                    </div>
                `
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, prodArray) {
    currentSortCriteria = sortCriteria;

    if (prodArray != undefined) {
        arrProductos = prodArray;
    }

    arrProductos = sortProducts(currentSortCriteria, arrProductos);

    //Muestro los productos ordenados.
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then( //Accedo a la lista de productos con una petición al servidor.
        function (resultObj) {
            if (resultObj.status === "ok") {  //Si está todo bien entonces...
                var productos = resultObj.data; //... le asigno a la variable productos su respectiva información, extraída del registro del url productos
                sortAndShowProducts(ORDER_ASC_BY_COST, productos);
            }
        });
    //ORDENAR


    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByRel").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList();
    });
});

