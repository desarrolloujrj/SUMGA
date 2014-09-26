/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function inicio(contex) {
    
    var context = contex;
    
    $('#form2').find('input, button, select').attr("disabled", "disabled");
    
    $('#tableTaller').dataTable();
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
                    nombreTaller: {
                        required: true, 
                        maxlength: 20
                    },
                    semestre: {
                        required: true, 
                        min: 1
                    },                    
                    idPlanEstudio: {
                        required: true
                    },
                    seriacion: {
                        maxlength: 20
                    },
                    clave: {
                        maxlength: 20 
                    }
                },
                messages: {
                    capacidad: "Este campo es requerido y numérico."
                }
            });
            if (validacion.form()) {
            
                alertify.confirm("¿Estás seguro de modificar el taller?", function(e) {
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
                    nombreTaller: {
                        required: true, 
                        maxlength: 20
                    },
                    semestre: {
                        required: true, 
                        min: 1
                    },                    
                    idPlanEstudio: {
                        required: true
                    },
                    seriacion: {
                        maxlength: 20
                    },
                    clave: {
                        maxlength: 20 
                    }
                }
            });
            if (validacion.form()) {
                        
                //al formulario se le indicoa que action debe de llamar 
                $('#form1').attr('action', context + "/registrarTaller");
                //se realiza submit al action
                $('#form1').submit();
            }

        });

    //$(".modificar").click(
    $('#tableTaller tbody').on('click', 'td .modificar', function (e) {
        e.preventDefault();
        
        $('#form2').find('input, button, select').removeAttr("disabled");
        
        var idplanestudio = $(this).data("idplanestudio");
        var semestre = $(this).data("semestre");
        
        $.getJSON(context + '/consultaSemestresGrupo', {
            idPlanEstudios: idplanestudio
        }).done(function(data) {

            $('#semestreM').find('option').remove();
            var selecciones = $('<option value="">Seleccione...</option>');
            $('#semestreM').append(selecciones);
            
            for (i = 1; i <= data.numeroSemestres; i++) {

                var opcion = $('<option value="' + i + '">' + i + '</option>');
                if(semestre==i){
                    opcion.attr("selected",true);
                }
                $('#semestreM').append(opcion);
            }
        });

        //se suben los valores a los input's
        $("#idTallerM").val($(this).data("id"));
        $("#nombreTallerM").val($(this).data("nombretaller"));
        $("#semestreM").val($(this).data("semestre"));
        $("#seriacionM").val($(this).data("seriacion"));
        $("#claveM").val($(this).data("clave"));
        $("#idPlanEstudioM").val($(this).data("idplanestudio"));   
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
            var idT = $(this).data("id");
            reset();
            alertify.set({
                buttonReverse: true, 
                labels: {
                    ok: "Aceptar", 
                    cancel: "Cancelar"
                }
            });
            alertify.confirm("¿Estás seguro de eliminar el taller?", function(e) {
                if (e) {
                    //se envia el id que viene en el "data-id" del elemento clickeado al hidden idTaller y ejecuto el action correspondiente
                    $('#idTaller').val(idT);
                    $('#form1').attr('action', context + "/eliminarTaller");
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
    
    
    $('#idPlanEstudio').change(function(e) {
        var idPlanEstudio = $(this).val();

        $.getJSON(context + '/consultaSemestresGrupo', {
            idPlanEstudios: idPlanEstudio
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
    
    $('#idPlanEstudioM').change(function(e) {
        var idPlanEstudio = $(this).val();

        $.getJSON(context + '/consultaSemestresGrupo', {
            idPlanEstudios: idPlanEstudio
        }).done(function(data) {

            $('#semestreM').find('option').remove();
            var selecciones = $('<option value="">Seleccione...</option>');
            $('#semestreM').append(selecciones);
            
            for (i = 1; i <= data.numeroSemestres; i++) {

                var opcion = $('<option value="' + i + '">' + i + '</option>');
                $('#semestreM').append(opcion);
            }
        });
    });
    
}


