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
var productos={};

// Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
firebase.auth().onAuthStateChanged(function(user) {
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
    firebase.auth().signOut().then(function() {
       location.assign('index.html');
   }, function(error)
   {
      alert("Error al intentar desconectarse.");
  });

}


/*
Evento: value

The value event is used to read a static snapshot of the contents at a given database path,
as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes.
The event callback is passed a snapshot containing all data at that location, including child data. In our code example above,
value returned all of the blog posts in our app. Everytime a new blog post is added, the callback function will return all of the posts.
*/

referencia.on('value',function(datos)
{
    // Eliminamos el contenido del listado para actualizarlo.
    $("#listado div.row").remove();

    productos=datos.val();

    // Recorremos los productos y los mostramos
    $.each(productos, function(indice,valor)
    {
        var prevProducto='<div class="row" id="'+indice+'"><div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 cabeceraProducto">';

        prevProducto+='<h2>'+valor.articulo+'</h2></div>';

        prevProducto+='<div class="row"><div class="col-3 col-sm-12 col-md-12 col-lg-12 col-xl-12 cabeceraProducto">';
        prevProducto+='<p><h2>$'+valor.precio+' </h2></div></p>';
        prevProducto+='</div>';

        prevProducto+='<div class="row">';
        prevProducto+='<div class="col-md-3 imagenFix">';
        if (valor.imagen=='NONE')
            prevProducto+='<img alt="Sin Fotografía"/>';
        else
            prevProducto+='<p><img src="'+valor.imagen+'"/></p>';
        prevProducto+='</div>';

        prevProducto+='<div class="col-md-3 descip">';
        prevProducto+='<p>'+valor.descripcion+'</p>';
        prevProducto+='</div>';
        prevProducto+='</div>';

        prevProducto+='<div class="row">';

        prevProducto+='<div class="col-md-3 btn1">';
        prevProducto+='<p><button type="button"  class="btn btn-primary" onclick="editarProducto(\''+indice+'\')">Editar Producto</button></p>';
        prevProducto+='</div>';

        prevProducto+='<div class="col-md-3 btn2">';
        prevProducto+='<button type="button" class="btn btn-danger" onclick="borrarProducto(\''+indice+'\')">Borrar Producto</button>';
        prevProducto+='</div>';

        prevProducto+='</div>';
        prevProducto+='<div class="row espaciador">';
        prevProducto+='</div>';

        $(prevProducto).appendTo('#listado');
    });

},function(objetoError){
    console.log('Error de lectura:'+objetoError.code);
});


function editarProducto(id)
{
    // Para pasar el ID a otro proceso lo hacemos a través de window.name
    window.name= id;

    // Cargamos la página editarproducto.html
    location.assign('editarproducto.html');
}

function borrarProducto(id)
{
    if (confirm("¿Está seguro/a de que quiere borrar este artículo?") == true)
    {
        referencia.child(id).remove();
    }
}