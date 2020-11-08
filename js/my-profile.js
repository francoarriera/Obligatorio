//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  preCargarData();
});

var elForm = document.getElementById("registrationForm");
elForm.addEventListener("submit", ()=>validarFormulario())

function validarFormulario() {
  var name = document.getElementById("nombre");
  var lastName = document.getElementById("apellido");
  var edad = document.getElementById("age");
  var celular = document.getElementById("mobile");
  var mail = document.getElementById("email");
  var infoMissing = false;
  var localStorageInfo = {};

  name.classList.remove("is-invalid");
  lastName.classList.remove("is-invalid");
  edad.classList.remove("is-invalid");
  celular.classList.remove("is-invalid");
  email.classList.remove("is-invalid");

  if (name.value === "") {
    name.classList.add("is-invalid");
    infoMissing = true;
  }
  else {
    name.classList.add("is-valid");
  }
  if (lastName.value === "") {
    lastName.classList.add("is-invalid");
    infoMissing = true;
  }
  else {
    lastName.classList.add("is-valid");
  }

  if (edad.value === "") {
    edad.classList.add("is-invalid");
    infoMissing = true;
  }

  else {
    edad.classList.add("is-valid");
  }

  if (email.value === "") {
    mail.classList.add("is-invalid");
    infoMissing = true;
  }
  else {
    mail.classList.add("is-valid")
  }

  if (celular.value === "") {
    celular.classList.add("is-invalid");
    infoMissing = true;
  }
  else {
    celular.classList.add("is-valid")
  }

  if (!infoMissing) {
    localStorageInfo.name = name.value;
    localStorageInfo.lastName = lastName.value;
    localStorageInfo.edad = edad.value;
    localStorageInfo.celular  = celular.value;
    localStorageInfo.mail = mail.value;

    localStorage.setItem('datosPersonales', JSON.stringify(localStorageInfo));
    document.getElementById("alertRes").classList.add('con-exito');
    document.getElementById("resultSp").innerHTML = "¡Has guardado con éxito!"
  }
  else {
    document.getElementById("resultSp").innerHTML = "¡Debe completar los datos correctamente!"
  }
  document.getElementById("alertRes").classList.add("show");
}

function preCargarData(){
  var datos = localStorage.getItem("datosPersonales");
  if (datos){
  var datitos = JSON.parse(datos);
  document.getElementById("nombre").value = datitos.name;
  document.getElementById("apellido").value = datitos.lastName;
  document.getElementById("age").value = datitos.edad ;
  document.getElementById("mobile").value = datitos.celular;
  document.getElementById("email").value = datitos.mail ;
  }
}