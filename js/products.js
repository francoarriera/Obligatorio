//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "sortAsc"
const ORDER_DESC_BY_COST = "sortDesc"
const ORDER_BY_PROD_RELEVANCIA = "sortByCount"
var productos = [];
var minCount = undefined;
var maxCount = undefined;

function listadoDeProductos(array) {
  var contenedor = document.getElementById('productos')
  var contenido = ""
  for (var i = 0; i < array.length; i++) {
    var producto = array[i];
    if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount && minCount >= 0)) &&
      ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount && maxCount >= 0))) {

      contenido +=`
  <div class="col-md-4">
  <a href="product-info.html" class="list-group-item-action">
    <div class="card mb-4 shadow-sm">
    <img src="${producto.imgSrc}" class="img-thumbnail">
      <div class="card-body">
        <h3><b>${producto.name}</b></h3>
        <h5>${producto.description}</h5><br>
        <h4>${producto.currency} ${producto.cost}</h4>
        
        <div class="d-flex justify-content-between align-items-center">
          <small>Artículos vendidos: ${producto.soldCount}</small>
        </div>
      </div>
    </div>
    </a>
  </div>
`


    //     `<a href="product-info.html" class="list-group-item-action">
    //     <div class="container">
    
    //         <div class="row no-gutters">
    //             <div class="col-4">
    //             <div class="card col-md-4">
    //                 <img src="${producto.imgSrc}" class="img-thumbnail">
    //             </div>
    //             <div class="col-8">
    //                 <div class="card-body">
    //                     <h3><b>${producto.name}</b></h3>
    //                     <h5>${producto.description}</h5><br>
    //                     <h4>${producto.currency} $${producto.cost}</h4>
    //                     <small>Artículos vendidos: ${producto.soldCount}</small>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     </div>
    //     </a>
    // `

    }


  }
  contenedor.innerHTML = contenido
}

function sortProductos(criteria, array) {
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
  } else if (criteria === ORDER_BY_PROD_RELEVANCIA) {
    result = array.sort(function (a, b) {

      if (a.soldCount > b.soldCount) { return -1; }
      if (a.soldCount < b.soldCount) { return 1; }
      return 0;
    });
  }

  return result;
}

function reconstruirSortProductos(ordenCriterio, productos) {
  var productosOrdenados = sortProductos(ordenCriterio, productos);

  document.getElementById("productos").innerHTML = "";

  listadoDeProductos(productosOrdenados);

}



document.addEventListener("DOMContentLoaded", function (e) {
  fetch(PRODUCTS_URL)
    .then(respuesta => respuesta.json())
    .then(data => {
      productos = data
      listadoDeProductos(productos)
    }
    )

  document.getElementById("sortAsc").addEventListener("click", function () {
    reconstruirSortProductos(ORDER_ASC_BY_COST, productos);
  })

  document.getElementById("sortDesc").addEventListener("click", function () {
    reconstruirSortProductos(ORDER_DESC_BY_COST, productos);
  })

  document.getElementById("sortByCount").addEventListener("click", function () {
    reconstruirSortProductos(ORDER_BY_PROD_RELEVANCIA, productos);
  })

  document.getElementById("FilterCount").addEventListener("click", function () {
    minCount = document.getElementById("FilterCountMin").value;
    maxCount = document.getElementById("FilterCountMax").value;
    listadoDeProductos(productos);
  })

  document.getElementById("clearFilter").addEventListener("click", function () {
    document.getElementById("FilterCountMin").value = "";
    document.getElementById("FilterCountMax").value = "";
    minCount = undefined;
    maxCount = undefined;
    listadoDeProductos(productos);
  })

});