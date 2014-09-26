/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function inicio(contex) {
    
    var context = contex;
    
    $('#form2').find('input, button, select').attr("disabled", "disabled");
    
    $('#tableGrupo').dataTable();
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
                    nombreGrupo: {
                        required: true, 
                        maxlength: 20
                    },
                    semestre: {
                        required: true, 
                        min: 1
                    },                
                    idPeriodo: {
                        required: true
                    },
                    idPlanEstudios: {
                        required: true
                    }
                }
            });
            if (validacion.form()) {
            
                alertify.confirm("¿Estás seguro de modificar el grupo?", function(e) {
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

    $('#idPlanEstudios').change(function(e) {
        var idPlanEstudios = $(this).val();
        
        $('#trTable2').find('th').remove();
        $('#materia').find('td').remove()
        $('#aviso').html('<br />');

        $.getJSON(context + '/consultaSemestresGrupo', {
            idPlanEstudios: idPlanEstudios
        }).done(function(data) {

            $('#semestre').find('option').remove();
            var selecciones = $('<option value="">Seleccione...</option>');
            $('#semestre').append(selecciones);
            
            for (i = 1; i <= data.numeroSemestres; i++) {

                var opcion = $('<option value="' + i + '">' + i + '</option>');
                $('#semestre').append(opcion);
            }
        });
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
                    nombreGrupo: {
                        required: true, 
                        maxlength: 20
                    },
                    semestre: {
                        required: true, 
                        min: 1
                    },                
                    idPeriodo: {
                        required: true
                    },
                    idPlanEstudios: {
                        required: true
                    }
                }
            });
            if (validacion.form()) {
                        
                //al formulario se le indicoa que action debe de llamar 
                $('#form1').attr('action', context + "/registrarGrupo");
                //se realiza submit al action
                $('#form1').submit();
            }

        });

    //$(".modificar").click(
    $('#tableGrupo tbody').on('click', 'td .modificar', function (e) {
        e.preventDefault();
        
        $('#form2').find('input, button, select').removeAttr("disabled");

        //se suben los valores a los input's
        $("#idGrupoM").val($(this).data("id"));
        $("#nombreGrupoM").val($(this).data("nombregrupo"));
        $("#semestreM option[value=" + $(this).data("semestre") + "]").attr('selected', 'selected');
        $("#antecesorM").val($(this).data("antecesor"));
        $("#capacidadM").val($(this).data("capacidad"));
        $("#idPeriodoM").val($(this).data("idperiodo"));
        $("#idPlanEstudiosM").val($(this).data("idplanestudios"));   
        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');

        //se oculta el el boton de registrar y activo el boton de modificar y cancelar
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

    $(".eliminar").click(
        function(e) {
            e.preventDefault();
            $('#form2').find('input, button, select').removeAttr("disabled");
            var idG = $(this).data("id");
            reset();
            alertify.set({
                buttonReverse: true, 
                labels: {
                    ok: "Aceptar", 
                    cancel: "Cancelar"
                }
            });
            alertify.confirm("¿Estás seguro de eliminar el grupo?", function(e) {
                if (e) {
                    //se envia el id que viene en el "data-id" del elemento clickeado al hidden idPlanEstudio y ejecuto el action correspondiente
                    $('#idGrupo').val(idG);
                    $('#form1').attr('action', context + "/eliminaGrupo");
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
    
    $('.number').keypress(function(e) {
                if (e.charCode < 48 || e.charCode > 57)
            return false;
        });
    
}


