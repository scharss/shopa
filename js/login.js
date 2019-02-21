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

function exito()
{
    $("#spinner").html("");
    location.assign('index.html');
}

$(function()
{
    $("#botonLogin").click(function()
    {
        $("#spinner").html("<img src='img/spinner.gif' style='width:25px; height:25px;'/>");
        var email=$("#email").val();
        var password=$("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(exito).catch(function(error)
        {
            $("#spinner").html("");
            //console.log(error);
            alert ("Error detectado:\n\n"+error.message);
        });
    });

    $("#botonRegistro").click(function()
    {
        location.assign('registro.html');
    });


    $("#botonCancelar").click(function()
    {
        location.assign('index.html');
    });

});