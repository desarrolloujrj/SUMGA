/*
 * @document PersonaView
 * @author Adan Cuautle
 * @versión 04/07/2014
 */





function iniciar(contex) {
    var context = contex;
    $('#tablesUsuario').dataTable();


    $(document).ready(function() {
        $("#mensajeValidacion").hide();
    });

    $('#estado').change(function(e) {
        var idEstado = $(this).val();

        $.getJSON(context + '/consultaMunicipios', {
            idEstado: idEstado
        }).done(function(data) {

            $('#idMunicipios').find('option').remove();
            $('#idMunicipios').append($('<option value="" >Seleccione...</option>'));
            $.each(data.municipios, function(posicion, municipio) {

                var opcion = $('<option value="' + municipio.idMunicipio + '">' + municipio.nombreMunicipio + '</option>')
                $('#idMunicipios').append(opcion);

                });
        });
    });

    $("#btnResgistra").click(function(e) {

        e.preventDefault();
        var validacion = $('#registraPersona').validate({
            rules: {
                nombre: {required: true, maxlength: 200},
                idRol: {required: true, min: 1},
                estado: {required: true, min: 1},
                idMunicipios: {required: true, min: 1},
                curp: {minlength: 18}

            }, messages: {
                idRol: {min: "Elije tipo de cuenta"},
                estado: {min: "Elije un estado"},
                idMunicipios: {min: "Elije un municipio"}
            }
        });
        if (validacion.form()) {
            $('#registraPersona').submit();
        }
    });

    $("#btnModificar").click(function(e) {
        e.preventDefault();


        var validacion = $('#modificaPersona').validate({
            rules: {
                nombre: {required: true, maxlength: 200},
                idRol: {required: true, min: 1},
                curp: {minlength: 18}

            }, messages: {
                idRol: {min: "Elije tipo de cuenta"}
            }
        });

        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el usuario?", function(e) {

                if (e) {
                    $('#modificaPersona').submit();
                }

            });
        }
    });

    $('#tablesUsuario tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idPersona = $(this).data("id");
        var estado = $(this).data("estado");
        reset();

        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        var status;
        if (estado !== true) {
            status = "¿Estás seguro de habilitar el usuario?";
        } else {
            status = "¿Estás seguro de deshabilitar el usuario?";
        }
        alertify.confirm(status, function(e) {
            if (e) {
                //envia el id que viene en el "data-id" del elemento seleccionado al hidden idPersona y ejecuta el action correspondiente
                $('#idPersona').val(idPersona);
                $('#status').val(estado);
                $('#mostrarPersona').attr('action', context + "/eliminaPersona");
                $('#mostrarPersona').submit();
            }
        });
    });

    $('#tablesUsuario tbody').on('click', 'td .modificar', function(e) {

        e.preventDefault();
        $('#modificaPersona').find('fieldset').removeAttr("disabled");
        $('#idPersonaM').val($(this).data("id"));
        $('#nombreM').val($(this).data("nom"));
        $('#aPaternoM').val($(this).data("ap"));
        $('#aMaternoM').val($(this).data("am"));
        $('#curpM').val($(this).data("curp"));
        $('#modificaPersona').find('[name="sexo"]').filter('[value="' + $(this).data("sexo") + '"]').attr('checked', true);
        $('#idRolM').val($(this).data("rol"));
        $('#idRolM').change();

        //se oculta el el boton de registrar y activo el boton de modificar y cancelar
        $("#mostrarT").removeClass('active');
        $("#mostrarT").removeClass('in');
        $("#mostrar").removeClass('active');

        $("#modificarT").addClass('active');
        $("#modificar").addClass('in');
        $("#modificar").addClass('active');

        $("#registrar").removeClass('active');
        $("#registrarT").removeClass('active');
        $("#registrarT").removeClass('in');

    });

    $('#botonCancelarModificar').click(
            function(e) {
                e.preventDefault();
                $('#modificarT').removeClass('active');
                $('#modificar').removeClass('active');
                $('#registrar').removeClass('active');
                $('#registrarT').removeClass('active');
                $('#mostrarT').addClass('active');
                $('#mostrar').addClass('active');
                $('#mostrar').addClass('in');
                $("#idSubModuloM").val(0);
                // ejecutamos el evento change()
                $('#idRolM').change();
                $('#modificaPersona').find('input, textarea, button').val('')
                $('#modificaPersona').find('fieldset').attr("disabled", "disabled");
//                alertify.error("No se realizó ninguna acción");
            });



    $('#restablecerPassword').on('blur', '#restUsuario', function(e) {
        e.preventDefault();
        var validacion = $('#restablecerPassword').validate({
            rules: {
                usuario: {required: true, maxlength: 200},
            }, messages: {
                idRol: {min: "Elije tipo de cuenta"}
            }
        });

        var usuario = $("#restUsuario").val();
        console.log("Usuario " + usuario);

        if (validacion.form()) {

            $.getJSON(context + '/buscaUsuario.action', {
                usuario: usuario
            }, function(data) {

                if (data.persona.idCuenta == 0 && data.persona.rolNombre == null) {
                    $("#mensajeValidacion").show().text("No existe usuario");
                }
                $("#camIdCuenta").val(data.persona.idCuenta);
                $("#camRolNombre").val(data.persona.rolNombre);
            });
        }
    });

    $('#btnRestablecer').click(function(e) {
        e.preventDefault();
        var validacion = $('#restablecerPassword').validate({
            rules: {
                usuario: {required: true, maxlength: 20},
            }
        });
        var usuario = $("#restUsuario").val();
        var idCuenta = $("#camIdCuenta").val();
        var rolNombre = $("#camRolNombre").val();

        if (validacion.form()) {
            $.getJSON(context + '/restablecerPassword.action', {
                usuario: usuario,
                idCuenta: idCuenta,
                rolNombre: rolNombre
            }, function(data) {

                if (!data.respuesta == true) {
                    $("#mensajeValidacion").show().text("No se realizo el cambio.");

                } else {
                    $("#mensajeValidacion").show().text("Contraseña reiniciada");
                }
            });

        }

    });


    function reset() {
        $("#toggleCSS").attr("href", "css/alertify.default.css");
        alertify.set({
            labels: {
                ok: "OK",
                cancel: "Cancel"
            },
            delay: 5000,
            buttonReverse: false,
            buttonFocus: "ok"
        });
    }
      
}

