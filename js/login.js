//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    form = document.forms[0];

    form.addEventListener('submit', onSubmit);
   
});

function onSubmit(event) {
    event.preventDefault();

    username = document.getElementById('username-input').value;
    pass = document.getElementById('pass-input').value;

    if (username === '' || pass === '') {
        document.getElementById('formError').innerHTML= "Complete todos los campos";
    } else {
        localStorage.setItem('loggedEmail', username);
        window.location = 'inicio.html';
    }
}

function cerrar(){
    localStorage.clear()
    window.location="index.html";
}

