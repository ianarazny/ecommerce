//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

"use strict";

var array = [];
function actualizar() {
    const user = document.getElementById('changeNameOfUser').value;
    const surnameUser = document.getElementById('changeSurnameOfUser').value;
    const emailUser = document.getElementById('changeInputEmail').value;
    const numberOfUser = document.getElementById('changeTelefono').value;

    console.log(user, surnameUser, emailUser, numberOfUser);
    array.push({
        user,
        surnameUser,
        emailUser,
        numberOfUser
    });

    localStorage.setItem('perfil', JSON.stringify(array));

};

// Get a reference to the image element
var elephant = document.getElementById("imagenUsuario");


function actualizarCard() {
    if (localStorage.getItem('perfil')) {
        let infoUsuario = JSON.parse(localStorage.getItem('perfil'));

        if ((infoUsuario[0].user === "") || (infoUsuario[0].surnameUser === "") || (infoUsuario[0].numberOfUser === "") || (infoUsuario[0].emailUser === "")) {
            alert('Por favor, llene todos los campos');
        }
        else {
            var nombre = document.getElementById('nameOfUser');
            nombre.innerHTML += infoUsuario[0].user + ` ` + infoUsuario[0].surnameUser;



            var mail = document.getElementById('inputEmail');
            mail.innerHTML += infoUsuario[0].emailUser;

            var numero = document.getElementById('telefono');
            numero.innerHTML += `Número:  ` + infoUsuario[0].numberOfUser;
        }

        console.log(JSON.parse(localStorage.getItem('perfil')));
        console.log(infoUsuario[0].user);
        console.log(infoUsuario[0].numberOfUser);

    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById('actualizarInfo').addEventListener('click', actualizar);
    actualizarCard();



    // Take action when the image has loaded
    elephant.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");

        // Make sure canvas is as big as the picture
        imgCanvas.width = elephant.width;
        imgCanvas.height = elephant.height;

        // Draw image into canvas element
        imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

        // Get canvas contents as a data URL
        var imgAsDataURL = imgCanvas.toDataURL("image/png");

        // Save image into localStorage
        try {
            localStorage.setItem("elephant", imgAsDataURL);
            console.log(localStorage('elephant'));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false);


});