// Inicializar la base de datos
var config = {
    apiKey: "AIzaSyB73xrbbkWO5IiJcs8HR3vbdQJ171Sh6-w",
    authDomain: "geoleaf-a1530.firebaseapp.com",
    databaseURL: "https://geoleaf-a1530.firebaseio.com",
    projectId: "geoleaf-a1530",
    storageBucket: "geoleaf-a1530.appspot.com",
    messagingSenderId: "719308462883"
};

firebase.initializeApp(config);

var email,password,passwordConfirm;

function exito()
{
  alert('Se ha creado la cuenta de usuario correctamente. ');
  location.assign('index.html');
}

function alFinalizar(error)
{
    // console.log(error);

    if (error!=='undefined')
    {
        // Códigos de error:
        // auth/invalid-email
        // auth/weak-password
        // auth/email-already-in-use
        switch(error.code)
        {
            case 'auth/email-already-in-use':
            alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
            break;
            case 'auth/invalid-email':
            alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
            break;
            default:
            alert('Se ha producido un error al crear el usuario.\n\n'+error+'\n');
            break;
        }
    }
}


$(function()
{
    // Programamos el click de los botones del formulario:
    $("#botonRegistro").click(function()
    {
        email=$("#email").val();
        password=$("#password").val();
        passwordConfirm=$("#password2").val();

        if (password != passwordConfirm)
        {
            alert("Error: Las contraseñas son distintas!");
        }
        else
            firebase.auth().createUserWithEmailAndPassword(email,password).then(exito).catch(alFinalizar);
    });


    $("#botonCancelar").click(function()
    {
        location.assign('index.html');
    });

});