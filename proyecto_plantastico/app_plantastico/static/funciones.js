function validar() {
  let nombre = document.getElementById('txt_nombre').value;
  console.log('Bienvenido: ' + nombre);

  if (nombre == "") {
    document.getElementById('txt_nombre').classList.add('is-invalid');
  }
}

/* API ECONOMIA*/
function economia() {
  $.ajax({
    url: 'https://mindicador.cl/api',
    method: 'GET',
    success: function (response) {
      console.log(response);

      $("#ol_economia").empty();

      $("#ol_economia").append('<li class="list-group-item d-flex justify-content-between align-items-start"> <div class="ms-2 me-auto"> <div class="fw-bold">' + response.dolar.valor + "</div>" + '-' + '</div> <span class="badge bg-primary rounded-pill">' + '</span> </li>')
      for (let x = 0; x < response.length; x++) {
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

/* API REGISTRO USUARIO*/
// !!! Reemplazado por Django
function enviarInformacion() {
  var correo = $("#idcorreito").val();
  var contrasena = $("#idclavecita").val();
  var nombre = $("#idnombre").val();
  var apellido = $("#idapellido").val();

  console.log(correo);
  console.log(contrasena);
  console.log(nombre);
  console.log(apellido);

  //Validaciones del modal de registro de usuario
  $("#div_validacion2").hide();
  var enviar = false;
  var mensaje = "";

  //variable de expresión regular (valida correo electrónico)
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  //validaciones solo letras para campos nombre y apellido
  let regex = /^[a-zA-Z ]+$/;
  //validaciones de seguridad para clave
  let regexClave = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  if (correo.trim() == "" || contrasena.trim() == "" || nombre.trim() == "" || apellido.trim() == "") {
    mensaje += "Debe rellenar todos los campos.<br>";
    enviar = true;
  } else {
    if (!regexEmail.test(correo.trim())) {
      mensaje += "El correo electrónico no es valido.<br>";
      enviar = true;
    }
    if (!regex.test(nombre.trim())) {
      mensaje += "El nombre no puede contener números.<br>";
      enviar = true;
    }
    if (!regex.test(apellido.trim())) {
      mensaje += "El apellido no puede contener números.<br>";
      enviar = true;
    }
    if (!regexClave.test(contrasena.trim())) {
      mensaje += "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolo.<br>";
      enviar = true;
    }

  }

  if (enviar) {
    $("#div_validacion2").show();
    $("#div_validacion2").html(mensaje);
  }
  else {

    var data = {
      nombreFuncion: "ClienteAlmacenar",
      parametros: [correo, contrasena, nombre, apellido]

    };

    $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        if (response.result[0].RESPUESTA == 'OK') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Cliente registrado correctamente'
          });

          $("#txt_nuevoCorreo").val("");
          $("#txt_nuevoContrasena").val("");
          $("#txt_nuevoNombre").val("");
          $("#txt_nuevoApellido").val("");

          var miModal = document.getElementById("exampleModal");
          $(miModal).modal("hide");
        } else if (response.result[0].RESPUESTA == 'ERR01') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: 'Correo ingresado ya se encuentra registrado'
          });
        }


        console.log(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }


}

/* API INICIO SESION*/
function ingresarSesion() {
  var correoLogin = $("#idcorreo").val();
  var contrasenaLogin = $("#idclave").val();
  //Validaciones del modal de inicio de sesión
  $("#div_validacion").hide();
  var enviar = false;
  var mensaje = "";

  //variable de expresión regular (valida correo electrónico)
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

  if (correoLogin.trim() == "" || contrasenaLogin.trim() == "") {
    mensaje += "Debe rellenar todos los campos.<br>";
    enviar = true;
  }
  else {
    if (!regexEmail.test(correoLogin)) {
      mensaje += "El correo electrónico no es valido.<br>";
      enviar = true;
    }

  }

  if (enviar) {
    $("#div_validacion").show();
    $("#div_validacion").html(mensaje);
  }
  else {

    var data = {
      nombreFuncion: "ClienteLogin",
      parametros: [correoLogin, contrasenaLogin]
    };

    $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        if (response.result == 'LOGIN OK') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Credenciales correctas'
          }).then(() => {
            //aqui redireccionamos a la pagina cuando las credenciales sean correctas
            setTimeout(function () {
              window.location.href = 'iniciosesion.html';
            }, 100);
          });
        } else if (response.result == 'LOGIN NOK') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })//.then((result) => {
          // Redirigir al usuario a otra página HTML después de que termine el temporizador de SweetAlert2
          //if (result.dismiss === swal.DismissReason.timer) {
          // window.location.href = 'iniciosesion.html';
          //}
          // });

          Toast.fire({
            icon: 'warning',
            title: 'Credenciales inválidas'
          })
        }


        console.log(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }


}

/* API CREACION PRODUCTO*/

function crearProducto() {
  var codigo = $("#idcodigo").val();
  var nombre = $("#idnomproduc").val();
  var descripcion = $("#iddescripcion").val();
  var precio = $("#idprecio").val();
  var stock = $("#idstock").val();


  //Validaciones del modal de registro de usuario
  $("#div_validacion3").hide();
  var enviar = false;
  var mensaje = "";

  if (codigo.trim() == "" || nombre.trim() == "" || descripcion.trim() == "" || precio.trim() == "" || stock.trim() == "") {
    mensaje += "Debe rellenar todos los campos.<br>";
    enviar = true;
  } else {
    if(precio < 0){
      mensaje += "El precio no puede ser menor a cero (0).<br>";
      enviar = true;
    }
    if(stock < 0){
      mensaje += "El stock no puede ser menor a cero (0).<br>";
      enviar = true;
    }

  }

  if (enviar) {
    $("#div_validacion3").show();
    $("#div_validacion3").html(mensaje);
  }
  else {
    var data = {
      nombreFuncion: "ProductoAlmacenar",
      parametros: [codigo, nombre, descripcion, precio, stock]

    };

    $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        if (response.result[0].RESPUESTA == 'OK') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Producto ingresado correctamente'
          }).then(() => {
            //redireccionamos al crear el producto correctamente
            setTimeout(function () {
              window.location.href = 'iniciosesion.html';
            }, 200);
          });
        } else if (response.result == 'ERR01') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: 'Error al ingresar el producto'
          })
        }


        console.log(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

}

/* API LISTAR PRODCUTOS*/
function listarProducto() {
  $.ajax({
    method: "GET",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php?nombreFuncion=ProductoListar",
    success: function (response) {
      console.log(response.result);

      const $cardsContainer = $('#div_productos');
      $cardsContainer.addClass('row');


      response.result.forEach((card) => {
        // Crear una nueva card con jQuery

        const $card = $('<div>', { class: 'col-md-12 col-sm-12 mb-4' }).attr('id-card', `card-${card.CODIGO}`).append(

          $('<div>', { class: 'card h-150' }).append(
            //$('<img>', { class: 'card-img-top', src: card.image, alt: card.title }),
            $('<div>', { class: 'card-body' }).css('overflow', 'auto').append(
              $('<h5>', { class: 'card-title', text: card.NOMBRE }),
              $('<p>', { class: 'card-text', text: "Código: " + card.CODIGO }),
              $('<p>', { class: 'card-text', text: "Descripción: " + card.DESCRIPCION }),
              $('<p>', { class: 'card-text card-precio', text: "Precio: $" + card.PRECIO }),
              $('<p>', { class: 'card-text', text: "Stock: " + card.STOCK }),
              $('<div>', { class: 'd-flex justify-content-center' }).append(
                $('<button>', { class: 'btn btn-success btn-agregar', text: 'Agregar al carrito' })

              )
            )
          )
        );
        // Agregar la card al contenedor
        $cardsContainer.append($card.wrap('<div class="col-md-4 col-sm-12"></div>').parent());
      });
      // Para sumar el precio y alcacenar el código del producto  
      let precioTotal = 0;
      let codigosSeleccionados = [];

      $cardsContainer.on('click', '.btn-agregar', function () {
        const $card = $(this).closest('.card');
        const codigo = $card.attr('id-card');
        const precio = parseFloat($card.find('.card-precio'));
        precioTotal += precio;
        codigosSeleccionados.push(codigo);
        console.log(`Precio total: $${precioTotal.toFixed(2)}`);
        console.log(`Códigos seleccionados: ${codigosSeleccionados}`);
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
}

/* API GENERAR CÓDIGO*/

function generaCodigo() {
  var correo = $("#idcorreoCompra").val();
  $("#div_validacion4").hide();
  var enviar = false;
  var mensaje = "";

  //variable de expresión regular (valida correo electrónico)
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

  if (correo.trim() == "") {
    mensaje += "Debe rellenar todos los campos.<br>";
    enviar = true;
  }
  else {
    if (!regexEmail.test(correo)) {
      mensaje += "El correo electrónico no es valido.<br>";
      enviar = true;
    }

  }

  if (enviar) {
    $("#div_validacion4").show();
    $("#div_validacion4").html(mensaje);
  }

  else {

  var data = {
    nombreFuncion: "CompraAlmacenar",
    parametros: [correo]

  };

  $.ajax({
    method: "POST",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
    data: JSON.stringify(data),
    
    
    success: function (response) {
      console.log(response.result);

    

      const $cardsContainer = $('#div_codigo');
      $cardsContainer.addClass('row');

      response.result.forEach((card) => {
        // Crear una nueva card con jQuery

        const $card = $('<div>', { class: 'col-md-12 col-sm-12 mb-4'}).append(
          $('<div>', { class: 'card h-150' }).append(
            //$('<img>', { class: 'card-img-top', src: card.image, alt: card.title }),
            $('<div>', { class: 'card-body' }).css('overflow', 'auto').append(
              $('<h5>', { class: 'card-title', text: 'Tu código es: ' }),
              $('<p>', { class: 'card-text', text: card.RESPUESTA }),             
            )
          )
        );
        // Agregar la card al contenedor
        $cardsContainer.append($card.wrap('<div class="col-md-12 col-sm-12"></div>').parent());
      });
      

    },
    error: function (error) {
      console.log(error);
    }
  });
}
}

/* API GENERADOR DE COMPRAS*/

function almacenaProducto() {
  /*/
  $("#div_validacion5").hide();
  var enviar = false;
  var mensaje = "";
  */
  var id_compra = $("#idcodigocompra").val();
  var codigo_producto = $("#idcodproducto").val();
  var cantidad = $("#idcantidadproducto").val();
  
  /*
  if (id_compra.trim() == "" || codigo_producto.trim() == "" || cantidad.trim() == "") {
      mensaje += "Debe rellenar todos los campos.<br>";
      enviar = true;
    } else {
        if(cantidad < 0){
          mensaje += "La cantidad no puede ser menor a cero (0).<br>";
          enviar = true;
        }  
    }
    

    if (enviar) {
      $("#div_validacion5").show();
      $("#div_validacion5").html(mensaje);
    }
    else {
  */

    var data = {
      nombreFuncion: "CompraDetalleAlmacenar",
      parametros: [id_compra, codigo_producto, cantidad]

    };

  $.ajax({
    method: "POST",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
    data: JSON.stringify(data),
    success: function (response) {
      console.log(response.result);

      const $cardsContainer = $('#div_compra');
      $cardsContainer.addClass('row');

      response.result.forEach((card) => {
        // Crear una nueva card con jQuery

        const $card = $('<div>', { class: 'col-md-12 col-sm-12 mb-4' }).append(

          $('<div>', { class: 'card h-150' }).append(
            //$('<img>', { class: 'card-img-top', src: card.image, alt: card.title }),
            $('<div>', { class: 'card-body' }).css('overflow', 'auto').append(
              $('<h5>', { class: 'card-title', text: 'Producto agregado con éxito a tu carrito! ' }),           
            )
          )
        );
        // Agregar la card al contenedor
        $cardsContainer.append($card.wrap('<div class="col-md-12 col-sm-12"></div>').parent());
      });
      

    },
    error: function (error) {
      console.log(error);
    }
  });
/* } */
} 




/* API ListarCompras*/

function listarCompra(){
  $.ajax({
    url: 'https://www.fer-sepulveda.cl/API_PLANTAS/api-service.php?nombreFuncion=CompraListar&correo=a.diaze@duocuc.cl',
    method: 'GET',
    success: function (response) {
      console.log(response.result);

      const $cardsContainer = $('#div_listaCompras');
      $cardsContainer.addClass('row');


      response.result.forEach((card) => {
        // Crear una nueva card con jQuery

        const $card = $('<div>', { class: 'col-md-12 col-sm-12 mb-4' }).attr('id-card', `card-${card.id_compra}`).append(

          $('<div>', { class: 'card h-150' }).append(
            
            $('<div>', { class: 'card-body' }).css('overflow', 'auto').append(
              $('<h5>', { class: 'card-title', text: card.ID_COMPRA }),
              $('<p>', { class: 'card-text', text: "Correo: " + card.CORREO }),
              $('<p>', { class: 'card-text', text: "Fecha: " + card.FECHA }),
              $('<p>', { class: 'card-text', text: "Detalle:" + card.DETALLE}),
            ) 
          )
        );
        // Agregar la card al contenedor
        $cardsContainer.append($card.wrap('<div class="col-md-12 col-sm-12"></div>').parent());
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function validarIngreso() {
  let validador = true;

  let correo = document.getElementById('txt_correo').value;
  let contrasena = document.getElementById('txt_contrasena').value;
  let nombre = document.getElementById('txt_nombre').value;
  let apellido = document.getElementById('txt_apellido').value;

  if (correo == '') {
      document.getElementById('txt_correo').classList.remove('is-valid');
      document.getElementById('txt_correo').classList.add('is-invalid');
      validador = false;
  } else {
      document.getElementById('txt_correo').classList.remove('is-invalid');
      document.getElementById('txt_correo').classList.add('is-valid');
  }

  if (contrasena == '') {
      document.getElementById('txt_contrasena').classList.remove('is-valid');
      document.getElementById('txt_contrasena').classList.add('is-invalid');
      validador = false;
  } else {
      document.getElementById('txt_contrasena').classList.remove('is-invalid');
      document.getElementById('txt_contrasena').classList.add('is-valid');
  }

  if (nombre == '') {
      document.getElementById('txt_nombre').classList.remove('is-valid');
      document.getElementById('txt_nombre').classList.add('is-invalid');
      validador = false;
  } else {
      document.getElementById('txt_nombre').classList.remove('is-invalid');
      document.getElementById('txt_nombre').classList.add('is-valid');
  }

  if (apellido == '') {
    document.getElementById('txt_apellido').classList.remove('is-valid');
    document.getElementById('txt_apellido').classList.add('is-invalid');
    validador = false;
  } else {
    document.getElementById('txt_apellido').classList.remove('is-invalid');
    document.getElementById('txt_apellido').classList.add('is-valid');
  }

  return validador;
}

function validarIngresoSesion() {
  let validador = true;

  let correo = document.getElementById('idcorreito').value;
  let contrasena = document.getElementById('idclavecita').value;


  if (correo == '') {
      document.getElementById('idcorreito').classList.remove('is-valid');
      document.getElementById('idcorreito').classList.add('is-invalid');
      validador = false;
  } else {
      document.getElementById('idcorreito').classList.remove('is-invalid');
      document.getElementById('idcorreito').classList.add('is-valid');
  }

  if (contrasena == '') {
      document.getElementById('idclavecita').classList.remove('is-valid');
      document.getElementById('idclavecita').classList.add('is-invalid');
      validador = false;
  } else {
      document.getElementById('idclavecita').classList.remove('is-invalid');
      document.getElementById('idclavecita').classList.add('is-valid');
  }

  return validador;
}

function validarIngresoProducto() {
    let validador = true;

    let codigo = document.getElementById('idcodigo').value;
    let nombre = document.getElementById('idnomproduc').value;
    let descripcion = document.getElementById('iddescripcion').value;
    let precio = document.getElementById('idprecio').value;
    let stock = document.getElementById('idstock').value;

    if (codigo == '') {
        document.getElementById('idcodigo').classList.remove('is-valid');
        document.getElementById('idcodigo').classList.add('is-invalid');
        validador = false;
    } else {
        document.getElementById('idcodigo').classList.remove('is-invalid');
        document.getElementById('idcodigo').classList.add('is-valid');
    }

    if (nombre == '') {
        document.getElementById('idnomproduc').classList.remove('is-valid');
        document.getElementById('idnomproduc').classList.add('is-invalid');
        validador = false;
    } else {
        document.getElementById('idnomproduc').classList.remove('is-invalid');
        document.getElementById('idnomproduc').classList.add('is-valid');
    }

    if (descripcion == '') {
        document.getElementById('iddescripcion').classList.remove('is-valid');
        document.getElementById('iddescripcion').classList.add('is-invalid');
        validador = false;
    } else {
        document.getElementById('iddescripcion').classList.remove('is-invalid');
        document.getElementById('iddescripcion').classList.add('is-valid');
    }

    if (precio == '') {
      document.getElementById('idprecio').classList.remove('is-valid');
      document.getElementById('idprecio').classList.add('is-invalid');
      validador = false;
    } else {
      document.getElementById('idprecio').classList.remove('is-invalid');
      document.getElementById('idprecio').classList.add('is-valid');
    }

    if (stock == '') {
      document.getElementById('idstock').classList.remove('is-valid');
      document.getElementById('idstock').classList.add('is-invalid');
      validador = false;
    } else {
      document.getElementById('idstock').classList.remove('is-invalid');
      document.getElementById('idstock').classList.add('is-valid');
    }

    return validador;

}