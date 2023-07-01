from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("mostrarAlmacenar/", views.mostrarAlmacenar, name="mostrarAlmacenar"),
    path("muestrausuarios/", views.muestraUsuarios, name="muestraUsuarios"),
    path("almacenar/", views.almacenar, name="almacenar"),
    path("accesorios", views.accesorios, name="accesorios"),
    path("carrito", views.carrito, name="carrito"),
    path("carritovacio", views.carritoVacio, name="carritoVacio"),
    path("compralista", views.compraLista, name="compraLista"),
    path("donacion", views.donacion, name="donacion"),
    path("iniciosesion", views.inicioSesion, name="inicioSesion"),
    path("maceteros", views.maceteros, name="maceteros"),
    path("plantas", views.plantas, name="plantas"),
    path("productos", views.productos, name="productos"),
    path("usuarioregistrado", views.usuarioRegistrado, name="usuarioRegistrado"),
    path("mostrarIniciarSesion", views.mostrarIniciarSesion, name="mostrarIniciarSesion"),
    path("iniciarSesion", views.iniciarSesion, name="iniciarSesion"),
    path("registrarproducto", views.registrarProducto, name="registrarproducto"),
    path("muestraproductos", views.muestraProductos, name="muestraproductos"),
    path("productoregistrado", views.productoRegistrado, name="productoregistrado"),
    path("almacenarproducto", views.almacenarProducto, name="almacenarproducto"),
    path("usuarioincorrecto", views.usuarioIncorrecto, name="usuarioincorrecto"),
    path("muestraproductos", views.muestraProductos, name="muestraproductos"),
    path("modificarproducto", views.modificarProducto, name="modificarproducto"),
    path("eliminar", views.eliminarProducto, name="eliminar"),
] 