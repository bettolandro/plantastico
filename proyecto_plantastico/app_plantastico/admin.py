from django.contrib import admin
from . models import Usuario
from . models import Producto
from . models import Carrito
from . models import ProductoCarrito

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(ProductoCarrito)