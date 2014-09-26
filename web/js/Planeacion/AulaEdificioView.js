/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function inicio(contex) {
    
    var context = contex;
    
    $('#form2').find('input, button, select').attr("disabled", "disabled");
    
    $('#tableAulaEdificio').dataTable();
    $('#ModificarAccion').click(
        function(e) {
            e.preventDefault();
            reset();
            alertify.set({
                buttonReverse: true, 
                labels: {
                    ok: "Aceptar", 
                    cancel: "Cancelar"
                }
            });
            
            var validacion = $('#form2').validate({
                rules: {
                    aula: {
                        required: true, 
                        maxlength: 20
                    },
                    edificio: {
                        required: true, 
                        maxlength: 20
                    }
                }
            });
            if (validacion.form()) {
            
                alertify.confirm("¿Estás seguro de modificar el aula?", function(e) {
                    if (e) {
                        //se envia el id que viene en el "data-id" del elemento clickeado al hidden y se ejecuta el action correspondiente
                        $('#form2').submit();
                    } else {
                        
                        $('#modificarT').removeClass('active');
                        $('#modificar').removeClass('active');
                        $('#registrar').removeClass('active');
                        $('#registrarT').removeClass('active');
                        $('#mostrarT').addClass('active');
                        $('#mostrar').addClass('active');
                        $('#mostrar').addClass('in');
                        $('#form2').reset();

                    }
                });
            }
            return false;


        });



    $('#Cancelar').click(
        function(e) {
            $('#modificarT').removeClass('active');
            $('#modificar').removeClass('active');
            $('#registrar').removeClass('active');
            $('#registrarT').removeClass('active');
            $('#mostrarT').addClass('active');
            $('#mostrar').addClass('active');
            $('#mostrar').addClass('in');
        });
                   
    $("#RegistraAccion").click(
        function(e) {
                        
            var validacion = $('#form1').validate({
                rules: {
                    aula: {
                        required: true, 
                        maxlength: 20
                    },
                    edificio: {
                        required: true, 
                        maxlength: 20
                    }
                }
            });
            if (validacion.form()) {
                //al formulario se le indica que action debe de llamar 
                $('#form1').attr('action', context + "/registrarAulaEdificio");
                //se hace submit al action
                $('#form1').submit();
            }

        }); 

    //$(".modificar").click(
    //    function(e) {
    $('#tableAulaEdificio tbody').on('click', 'td .modificar', function (e) {
        e.preventDefault();
        
        $('#form2').find('input, button, select').removeAttr("disabled");

        //se suben los valores a los input's
        $("#idAulaEdificioM").val($(this).data("id"));
        $("#aulaM").val($(this).data("aula"));
        $("#edificioM").val($(this).data("edificio"));
        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');

        //se oculta el el boton de registrar y se activa el boton de modificar y cancelar
        $("#mostrarT").removeClass('active');
        $("#mostrarT").removeClass('in');
        $("#mostrar").removeClass('active');


        $("#registrar").removeClass('active');
        $("#registrarT").removeClass('active');
        $("#registrarT").removeClass('in');

        $("#modificarT").addClass('active');
        $("#modificar").addClass('in');
        $("#modificar").addClass('active');



    });

    $('#tableAulaEdificio tbody').on('click', 'td .eliminar', function (e) {
        e.preventDefault();
        var idAE = $(this).data("id");
        $('#form2').find('input, button, select').removeAttr("disabled");
        reset();
        alertify.set({
            buttonReverse: true, 
            labels: {
                ok: "Aceptar", 
                cancel: "Cancelar"
            }
        });
        alertify.confirm("¿Estás seguro de eliminar el aula?", function(e) {
            if (e) {
                //se envia el id que viene en el "data-id" del elemento clickeado al hidden idPlanEstudio y ejecuto el action correspondiente
                $('#idAulaEdificio').val(idAE);
                $('#form1').attr('action', context + "/eliminarAulaEdificio");
                $('#form1').submit();
            } else {
               
            }
        });
        return false;

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
