/*
 * @document PerfilView
 * @author Adan Cuautle
 * @versión 06/08/2014
 */


function iniciar(contex) {
    var context = contex;

    $(document).ready(function() {
        $("#mensajeValidacion").hide();
    });

    //Calcula edad
    $('#cambiaContrasena').on('blur', '#contrasenaC', function(e) {
        e.preventDefault();

        var contrasenaNueva = $("#contrasenaN").val();
        var contrasenaConfirma = $("#contrasenaC").val();

        if (contrasenaConfirma != "" & contrasenaNueva != contrasenaConfirma) {
            $("#mensajeValidacion").show().text("Las contraseña no son iguales, intenta nuevamente.");
        }
        console.log("No entre")
    });

    $('#btnCambiar').on('click', function(e) {
        e.preventDefault();

        var validacion = $('#cambiaContrasena').validate({
            rules: {
                contrasenaActual: {required: true, maxlength: 45},
                contrasenaNueva: {required: true, maxlength: 45},
                contrasenaConfirma: {required: true, maxlength: 45}
            }, messages: {
                contrasenaNueva: {min: "Ingresa contraseña"},
                contrasenaConfirma: {min: "Ingresa nueva contraseña"}
            }
        });

        var contrasenaActual = $("#contrasenA").val();
        var contrasenaNueva = $("#contrasenaN").val();
        var contrasenaConfirma = $("#contrasenaC").val();

        console.log("Pass 1: " + contrasenaActual + " Pass 2: " + contrasenaNueva + " Pass 3: " + contrasenaConfirma);
        if (validacion.form()) {
            reset();

            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Está seguro de cambiar su contraseña?", function(e) {
                if (e) {
                    //Se ejecuta function
                    if (contrasenaActual != "") {
                        $.getJSON(context + '/cambiaContrasena.action', {
                            contrasenaActual: contrasenaActual,
                            contrasenaNueva: contrasenaNueva
                        }, function(data) {

                            console.log("Ya volvi: " + contrasenaActual);
//                        $("#edad").val(data.edad);
                        });
                    }
                } else {
                    alertify.error("No se realizo ninguna acción");
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

    // tooltip demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    // popover demo
    $("[data-toggle=popover]")
            .popover();
}

