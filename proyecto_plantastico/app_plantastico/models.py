from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

# Create your models here.
class Usuario(models.Model):
    correo              = models.CharField(max_length=50, primary_key=True)
    clave               = models.CharField(max_length=12)
    nombre              = models.CharField(max_length=50)
    apellido            = models.CharField(max_length=50)

class Producto(models.Model):
    codigo              = models.CharField(max_length=50, primary_key=True)
    nomproducto         = models.CharField(max_length=50)
    descripcion         = models.CharField(max_length=150) 
    precio              = models.IntegerField()
    stock               = models.IntegerField() 

class Carrito(models.Model):
	codigo_carrito 	    = models.CharField(max_length=40, primary_key=True)
	usuario 	        = models.ForeignKey(Usuario, on_delete=models.CASCADE)
	

class ProductoCarrito(models.Model):
    id_procar           = models.AutoField(primary_key=True)
    codigo_carrito      = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    codigo_producto     = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad_producto   = models.IntegerField()

