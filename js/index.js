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

    // Fijarse que la ruta de partida ahora es la colección productos:
    var referencia=database.ref("productos");

    var productos={};

    /*
    Evento: value

    The value event is used to read a static snapshot of the contents at a given database path,
    as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes.
    The event callback is passed a snapshot containing all data at that location, including child data. In our code example above,
    value returned all of the blog posts in our app. Everytime a new blog post is added, the callback function will return all of the posts.
    */

    referencia.on('value',function(datos)
    {
        productos=datos.val();

        // Recorremos los productos y los mostramos
        $.each(productos, function(indice,valor)
        {
            var prevProducto='<div class="row"><div class="col-md-3 cabeceraProducto">';

            prevProducto+='<p><h2> '+valor.articulo+'</h2></div></p>';

            prevProducto+='<div class="row"><div class="col-md-3 cabeceraProducto">';
            prevProducto+='<p><h2>Precio: $'+valor.precio+' </h2></div></p>';
            prevProducto+='</div>';

            prevProducto+='<div class="row">';
            prevProducto+='<div class="col-md-3 imagenFix">';
            if (valor.imagen=='NONE')
                prevProducto+='<img alt="Sin Fotografía"/>';
            else
                prevProducto+='<p><img src="'+valor.imagen+'"/></p>';
            prevProducto+='</div>';

            prevProducto+='<div class="col-md-3 descip2">';
            prevProducto+='<p>'+valor.descripcion+'</p>';
            prevProducto+='</div>';
            prevProducto+='</div>';

            prevProducto+='</div>';
            prevProducto+='<div class="row espaciador">';
            prevProducto+='</div>';

            $(prevProducto).appendTo('#listado');
        });

    },function(objetoError){
        console.log('Error de lectura:'+objetoError.code);
    });

});
