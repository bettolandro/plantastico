from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

# Create your models here.
class Usuario(models.Model):
    correo = models.CharField(max_length=50, primary_key=True)
    clave = models.CharField(max_length=12)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)

class Producto(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)
    nomproducto= models.CharField(max_length=50)
    descripcion = models.CharField(max_length=150) 
    precio = models.CharField(max_length=50)
    stock = models.CharField(max_length=10) 