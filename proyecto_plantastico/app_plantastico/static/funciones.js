/* API GENERAR CÓDIGO*/

function generaCodigo() {
  var correo = $("#idcorreoCompra").val();

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

/** Validar datos registro usuario*/
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

/** Validar datos inicio sesion*/
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