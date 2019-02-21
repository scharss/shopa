$(document).ready(function()
{
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
    var database = firebase.database();
    var referencia=database.ref("productos");

    var productoId= window.name;
    //console.log(productoId);

    var articulo, descripcion, precio, imagen;
    var producto={};

    // Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
    firebase.auth().onAuthStateChanged(function(user)
    {
        if (user)
        {
            console.log(user);
            console.log('Usuario: '+user.uid+' está logueado con '+user.providerData[0].providerId);
            var logueado='<li><p class="navbar-text navbar-center" style="color:white">'+user.email+'</p></li>';
            logueado+='<li><button type="button" class="btn btn-light navbar-btn" id="botonLogout">Salir</button></li>';

            $(logueado).appendTo('.nav');
            $("#botonLogout").click(desconectar);

        } else
        {
            console.log('Usuario no logueado');
            location.assign('login.html');
        }
    });


    function desconectar()
    {
        firebase.auth().signOut().then(function()
        {
           location.assign('index.html');
       }, function(error)
       {
          alert("Error al intentar desconectarse.");
      });
    }

    // Buscamos el artículo.
    referencia.child(productoId).once('value',function(datos)
    {
        producto=datos.val();

        articulo= producto.articulo;
        descripcion= producto.descripcion;
        precio=producto.precio;
        imagenEdicion=producto.imagen;

        $('#articulo').val(articulo);
        $('#descripcion').val(descripcion);
        $('#precio').val(precio);
        $('#previsualizacion').attr('src',imagenEdicion);
    });


    $("#imagen").change(function()
    {
        var descriptor=new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function()
        {
            imagenEdicion=descriptor.result;
            $("#previsualizacion").attr("src",imagenEdicion);
        };
    });

    $("#botonActualizar").click(function()
    {
        var articulo=$("#articulo").val();
        var descripcion=$("#descripcion").val();
        var precio=$("#precio").val();
        var imagen=imagenEdicion;

        // Guardamos los datos en referencia
        referencia.child(productoId).update(
        {
            articulo: articulo,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen,
        }, alFinalizar);
    });

    function alFinalizar(error)
    {
        if (error)
        {
            alert('Ha habido problemas al realizar la operación: '+error.code);
        }
        else{
            alert('Operación realizada con éxito !');
            location.assign('administracion.html');
        }
    }
});