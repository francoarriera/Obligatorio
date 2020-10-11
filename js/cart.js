//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carro = [];
var tasaDeEnvio = 0;

function calcularSubtotal(){
  var costoTotal = 0;

  for (var i = 0; i < carro.articles.length; i++){
    var item = carro.articles[i];
    costoTotal+= item.unitCost * item.count;
  }
  
  document.getElementById("subtotalGeneral").innerHTML = costoTotal;
}

function costoEnvio(tasaEnvio){
  var costoTotal = 0;

  for (var i = 0; i < carro.articles.length; i++){
    var item = carro.articles[i];
    costoTotal+= item.unitCost * item.count;
  }
  costoTotal+= Math.round(costoTotal * tasaEnvio);
  tasaDeEnvio = tasaEnvio
  document.getElementById("envioTotal").innerHTML = costoTotal;
  
}

function recalcular(i){
  var cantidad= document.getElementById(i).value;
  var total = "USD " + carro.articles[i].unitCost*cantidad;
  carro.articles[i].count = cantidad;
  document.getElementById('costo'+i).innerHTML=total;
  calcularSubtotal();
  if(tasaDeEnvio !== 0){
  costoEnvio(tasaDeEnvio);
}
}

function productosDelCarrito(array) {
    var contenedor = document.getElementById('carrinho')
    var contenido = ""

    contenedor.innerHTML = contenido;

    

    contenido += `
    <div>
       
    <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col" style="align-right">Precio</th>
      </tr>
    </thead>
    </div>
      `

    for (var i = 0; i < array.articles.length; i++) {
      let carrito = array.articles[i]; {
       
        if(carrito.currency === "UYU"){
         carrito.unitCost = (carrito.unitCost / 40).toFixed(1);
        }

       contenido += `
      <tbody>
       <td>
      <img src="${carrito.src}" width="70" height="70"  class="sc-product-image"/>
      </td>
      <td><h3><b>${carrito.name}</b></h3></td>
      <td>
        <input type="number" id="${i}" value="${carrito.count}" min="1" onchange="recalcular(${i})">
      </td>
      <td><h4 id="costo${i}">USD ${carrito.unitCost * carrito.count}</h4></td>
      </tbody>
      
      `


        
      }
     
    }
    contenido+= `<td></td>
        `

      contenedor.innerHTML = contenido;
      calcularSubtotal();

  }


document.addEventListener("DOMContentLoaded", function(e){
    fetch(CART_DESAFIATE_URL)
      .then(respuesta => respuesta.json())
      .then(data => {
        carro = data
        productosDelCarrito(carro);
      }
      )
      })


