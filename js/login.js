//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var array = [];
function login() { //Se ejecuta al clickear en el login 
  const aEmail = document.getElementById('Email').value; //El dato ingresado en los campos de mail y pass se almacena como aEmail
  const aPass = document.getElementById('Pass').value;
  console.log(aEmail, aPass);
  if (aEmail && aPass) { //Si están ingresados el mail y contraseña
    array.push({
      aEmail, //Meto la información en el arreglo.
      aPass,
    });
    localStorage.setItem("Usuario", JSON.stringify(array)); //stringify lleva de objeto a JSON
    window.location = "index.html";
  } else {
    alert("Debe logearse");
  }
};
//Necesito guardar la información en el local storage, entonces...

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signin").addEventListener("click", login); //Luego de clickear en login, se almacena la info.

});

