//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carro = [];
var tasaDeEnvio = 0;
let SUCCESS_MSG = "¡Se ha realizado la publicación con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

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
  document.getElementById("costoEnvio").innerHTML = Math.round(costoTotal * tasaEnvio);
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

function pasarAUsd() {
  for (var i = 0; i < carro.articles.length; i++) {
    let carrito = carro.articles[i]; {
     
      if(carrito.currency === "UYU"){
        carrito.unitCost = (carrito.unitCost / 40).toFixed(1);

      }
  }

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
        <th></th>
      </tr>
    </thead>
    </div>
      `

    for (var i = 0; i < array.articles.length; i++) {
      let carrito = array.articles[i]; {
       


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
      <td><button id="btnEliminar" class="btn btn-danger btn-sm rounded-0"  type="button" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="borrar(${i}); productosDelCarrito(carro); costoEnvio(tasaDeEnvio)">
      <i class="fa fa-trash"></i></button>
      </td>
      </tbody>
      
      `


        
      }
     
    }
    contenido+= `<td></td>
        `

      contenedor.innerHTML = contenido;
      calcularSubtotal();

  }

    //borrar elementos de un array
function borrar(indice) { 
  carro.articles.splice(indice, 1);
}

function borrarRojo() {
  formaDePago=document.getElementById("formaPago");
  formaDePago.classList.remove("rojo");
}



  // Controles de envio formulario
  document.getElementById('BtnEnvioInfo').addEventListener("click",function(){
       
    var numero=document.getElementById("inputNumero"); 
    var direccion=document.getElementById("inputCalle");
    var esquina=document.getElementById("inputEsquina"); 
    var formaDePago=document.getElementById("formaPago");
    var infoMissing=false;

          direccion.classList.remove("is-invalid");
          numero.classList.remove("is-invalid");
          esquina.classList.remove("is-invalid");
          formaPago.classList.remove("is-invalid");
          formaPago.classList.remove("rojo");

           if (direccion.value==="") { 
             direccion.classList.add("is-invalid");
             infoMissing=true;                         
           } 
           else {
             direccion.classList.add("is-valid");
           }
           if (numero.value==="") {
             numero.classList.add("is-invalid");
             infoMissing=true;
           }
           else {
             numero.classList.add("is-valid");
           }

           if (esquina.value==="") {
             esquina.classList.add("is-invalid");
             infoMissing=true;
           }
           
           else{          
             esquina.classList.add("is-valid");
           }
           
           if (formaDePago.textContent==="-Seleccione una forma de pago-"){
             formaDePago.classList.add("rojo");
             infoMissing=true;
           }
          else {
             formaDePago.classList.add("is-valid")
           }

           if (!infoMissing)
           {
           

          getJSONData(CART_BUY_URL).then(function(resultObj){
            let msgToShowHTML = document.getElementById("resultSp")
            let msgToShow = "";

            if(resultObj.status === 'ok')
            {
              msgToShow = resultObj.data.msg;
              document.getElementById("alertRes").classList.add('con-exito');
            }
            else if (resultObj.status ==='error')
            {
              msgToShow = ERROR_MSG;
              document.getElementById("alertRes").classList.add('sin-exito');
            }
            
            msgToShowHTML.innerHTML = msgToShow;
            document.getElementById("alertRes").classList.add("show");
            
          })
          }
 });
//

document.addEventListener("DOMContentLoaded", function(e){
    fetch(CART_DESAFIATE_URL)
      .then(respuesta => respuesta.json())
      .then(data => {
        carro = data
        pasarAUsd();
        productosDelCarrito(carro);
      }
      )
      })
