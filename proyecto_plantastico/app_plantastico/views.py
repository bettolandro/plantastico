from django.shortcuts import render, redirect
from django.http import HttpResponse
from . models import Usuario
from . models import Producto
from . models import Carrito
from . models import ProductoCarrito

# Create your views here.
def index(request):
    return render(request, "app_plantastico/index.html")

def accesorios(request):
    return render(request, "app_plantastico/accesorios.html")

def carrito(request):
    return render(request, "app_plantastico/carrito.html") 

def carritoVacio(request):
    return render(request, "app_plantastico/carritoVacio.html") 

def compraLista(request):
    return render(request, "app_plantastico/compralista.html")

def donacion(request):
    return render(request, "app_plantastico/donacion.html")

def maceteros(request):
    return render(request, "app_plantastico/maceteros.html")

def plantas(request):
    return render(request, "app_plantastico/plantas.html")

def productos(request):
    return render(request, "app_plantastico/productos.html")

def mostrarAlmacenar(request):
    return render(request, "app_plantastico/almacenar.html")

def usuarioRegistrado(request):
    return render(request, "app_plantastico/usuarioregistrado.html")

def muestraUsuarios(request):
    lista_usuarios = Usuario.objects.all()
    return render(request, "app_plantastico/muestrausuarios.html", {"lista_usuarios": lista_usuarios}) 

def almacenar(request):
    if request.method == "POST":
        print(request.POST)
        correo = request.POST.get("correo")
        contrasena = request.POST.get("contrasena")
        nombre = request.POST.get("nombre")
        apellido = request.POST.get("apellido")

        nuevo_usuario = Usuario(correo, contrasena, nombre, apellido)
        nuevo_usuario.save()

        return usuarioRegistrado(request)
    else:
        return muestraUsuarios(request)
    
def inicioSesion(request):
    lista_productos = Producto.objects.all()
    return render(request, "app_plantastico/iniciosesion.html", {"lista_productos": lista_productos})

def mostrarIniciarSesion(request):
    return render(request, "app_plantastico/iniciarsesion.html")   

def usuarioIncorrecto(request):
    return render(request, "app_plantastico/usuarioincorrecto.html")   
        
def iniciarSesion(request):
        mail = request.GET.get("mail")
        password = request.GET.get("password")
        usuario = None

        try:
            usuario = Usuario.objects.get(correo=mail, clave=password) 
        except Usuario.DoesNotExist:
            pass

        if usuario:
            return render(request, "app_plantastico/iniciosesion.html")
        else:
            # Usuario no válido, mostrar mensaje de error
            return render(request, "app_plantastico/usuarioincorrecto.html")

def registrarProducto(request):
    return render(request, "app_plantastico/registrarproducto.html")
  
def productoRegistrado(request):
    return render(request, "app_plantastico/productoregistrado.html")
    
def almacenarProducto(request):
    if request.method == "POST":
        print(request.POST)
        codigo = request.POST.get("codigo")
        nomproducto = request.POST.get("nombre")
        descripcion = request.POST.get("descripcion")
        precio = request.POST.get("precio")
        stock = request.POST.get("stock") 

        nuevo_producto = Producto(codigo, nomproducto, descripcion, precio, stock)
        nuevo_producto.save()

        return productoRegistrado(request)
    else:
        return muestraProductos(request)

def muestraProductos(request):
    lista_productos = Producto.objects.all()
    return render(request, "app_plantastico/muestraproductos.html", {"lista_productos": lista_productos})     
    
def modificarProducto(request):
    if request.method== "GET":
        producto_encontrado = Producto.objects.get(codigo=request.GET.get("codigo"))

        return render(request, "app_plantastico/modificarproducto.html", {
            "producto": producto_encontrado
        })
    
    elif request.method== "POST":
            print("1")
            codigo2 = request.POST.get("txt_codigo")
            nomproducto2= request.POST.get("txt_nomproducto")
            descripcion2 = request.POST.get("txt_descripcion")
            precio2 = request.POST.get("txt_precio")
            stock2 = request.POST.get("txt_stock") 
            
            producto_modificado= Producto.objects.get(codigo = codigo2)
            producto_modificado.nomproducto = nomproducto2
            producto_modificado.descripcion = descripcion2
            producto_modificado.precio = precio2
            producto_modificado.stock = stock2
            producto_modificado.save()

            lista_productos = Producto.objects.all()

            return render(request, "app_plantastico/muestraproductos.html",{
                'lista_productos': lista_productos
            })
    
def muestraModificarProducto(request):
    return render(request, "app_plantastico/modificarproducto.html")


def eliminarProducto(request):
    codigo2 = request.GET.get("codigo")
    producto_eliminado= Producto.objects.get(codigo = codigo2)
    producto_eliminado.delete()
    lista_productos = Producto.objects.all()

    return render(request, "app_plantastico/muestraproductos.html",{
        'lista_productos': lista_productos
    })

def almacenarCarrito(request):
    if request.method == "POST":
        print(request.POST)
        usuario_email = request.POST.get("idcorreoCompra")
        codigo_carrito = request.POST.get("codigoCarrito")
        usuario = None

        try:
            usuario = Usuario.objects.get(correo=usuario_email) 
        except Usuario.DoesNotExist:
            pass

        if usuario:
            nuevo_carrito = Carrito(codigo_carrito=codigo_carrito, usuario=usuario)
            nuevo_carrito.save()

            context = {
                'codigo_generado': codigo_carrito
            }

            return render(request, "app_plantastico/carrito2.html", context)
        else:
            # Usuario no válido, mostrar mensaje de error
            return render(request, "app_plantastico/usuarioincorrecto.html")
    else:
        return render(request, "app_plantastico/carrito.html")

def seleccionarProductos(request):
    
    if request.method == "POST":
        print(request.POST)
        id_carrito = request.POST.get("codigoCarrito")
        id_producto = request.POST.get("codigoProducto")
        cantidad_producto = request.POST.get("cantidadProducto")
        
        carrito = Carrito.objects.get(codigo_carrito=id_carrito) 

        try:
            producto = Producto.objects.get(codigo=id_producto) 
        except Producto.DoesNotExist:
            producto = None

        if producto:
            # Crear el objeto ProductoCarrito
            nueva_compra = ProductoCarrito(
                codigo_carrito=carrito,
                codigo_producto=producto,
                cantidad_producto=cantidad_producto
            )
            nueva_compra.save()
            
            context = {
                'codigo_generado': id_carrito,
            }
            
            return render(request, "app_plantastico/carrito2.html", context)
        else:
            # mensaje de error
            return render(request, "app_plantastico/carrito.html")
    else:
        return render(request, "app_plantastico/index.html")

def comprarProductos(request):
    lista_productos = Producto.objects.all()
    return render(request, "app_plantastico/carrito2.html", {"lista_productos": lista_productos})     
    
def comprasRealizadas(request):
    lista_compras = ProductoCarrito.objects.all()
    return render(request, "app_plantastico/comprasrealizadas.html", {"lista_compras": lista_compras})     