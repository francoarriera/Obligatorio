//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function listadoDeProductos(array){
    var contenedor = document.getElementById('productos')
    var contenido = ""
    for(var i = 0; i < array.length; i++){
        var producto = array[i]
        contenido += `<div class="card mb-3" style="max-width: 1000px;">
        <div class="row no-gutters">
          <div class="col-4">
            <img src="${producto.imgSrc}" class="img-thumbnail">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h3><b>${producto.name}</b></h3>
              <h5>${producto.description}</h5><br>
              <h4>${producto.currency} $${producto.cost}</h4>
              <small>Artículos vendidos: ${producto.soldCount}</small>
            </div>
          </div>
        </div>
      </div>`
    }
    contenedor.innerHTML= contenido
}


document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(respuesta=>respuesta.json())
        .then(data=>{
            listadoDeProductos(data)
        }
            )
});
