# Generated by Django 4.2.2 on 2023-07-01 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_plantastico', '0004_carrito_alter_producto_precio_alter_producto_stock_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productocarrito',
            name='id',
        ),
        migrations.AddField(
            model_name='productocarrito',
            name='id_procar',
            field=models.AutoField(default=0, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
