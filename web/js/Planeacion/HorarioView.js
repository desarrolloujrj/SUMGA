/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function inicio(contex) {
    
    var context = contex;
    
    $('#form2').find('input, button, select').attr("disabled", "disabled");

    $('#tableHorario').dataTable();
    $('#ModificarAccion').click(function(e) {
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
                idPlanEstudios: {
                    required: true
                },
                idAreaAcademica: {
                    required: true
                },
                idPeriodo: {
                    required: true
                },
                semestre: {
                    required: true, 
                    maxlength: 20
                },
                idGrupo: {
                    required: true
                },
                idProfesor: {
                    required: true
                },
                horas: {
                    required: true, 
                    number:true
                },
                horario: {
                    required: true, 
                    maxlength: 20
                },
                idAulaEdificio: {
                    required: true
                }
            },
            messages: {
                horas: "Este campo es requerido y numérico."
            }
        });
        if (validacion.form()) {
            alertify.confirm("¿Estás seguro de modificar el horario?", function(e) {
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
                                       
    $('#tableHorario tbody').on('click', 'td .modificar', function (e) {
            e.preventDefault();
            $('#form2').find('input, button, select').removeAttr("disabled");
            var idHorario = $(this).data("id");
            var idProfesor = $(this).data("profesor");
                        
            $.getJSON(context + '/consultarProfesorHorario', {
                idHorario: idHorario
            }).done(function(data) {

                $('#idProfesorM').find('option').remove();
                var selecciones = $('<option value="">Seleccione...</option>');
                $('#idProfesorM').append(selecciones);
                $.each(data.prof, function(posicion, profesor) {

                    var opcion = $('<option value="' + profesor.idProfesor + '">' + profesor.nombreProfesor +" "+ profesor.aPaterno+" "+ profesor.aMaterno+ '</option>')
                    if(idProfesor==profesor.idProfesor){
                        opcion.attr("selected",true);
                    }
                    $('#idProfesorM').append(opcion);
                    });
            });
                        

            //se suben los valores a los input's
            $("#idHorarioM").val($(this).data("id"));
            $("#nombreGrupoM").val($(this).data("nombregrupo"));
            $("#nombreMateriaM").val($(this).data("nombremateria"));
            $("#nombrePlanEstudiosM").val($(this).data("nombreplanestudios"));
            $("#idProfesorM").val($(this).data("profesor"));
            $("#horarioM").val($(this).data("horario"));
            $("#horasM").val($(this).data("horas"));
            $("#idAulaEdificioM").val($(this).data("aula"));

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
                    
                
    $('#idAreaAcademica').change(function(e) {
        var idAreaAcademica = $(this).val();
        
        $('#trTable2').find('th').remove();
        $('#materia').find('td').remove()
        $('#aviso').html('<br />');

        $.getJSON(context + '/consultarPlanEstudiosArea', {
            idAreaAcademica: idAreaAcademica
        }).done(function(data) {

            $('#idPlanEstudios').find('option').remove();
            var selecciones = $('<option value="">Seleccione...</option>');
            $('#idPlanEstudios').append(selecciones);
            $.each(data.planes, function(posicion, plan) {

                var opcion = $('<option value="' + plan.idPlanEstudios + '">' + plan.nombrePlanEstudios + '</option>')
                $('#idPlanEstudios').append(opcion);
                });
        });
    });
                
    $('#semestre').change(function(e) {
        var semestre = $(this).val();
        var idPlanEstudios = $('#idPlanEstudios').val();
        var idAreaAcademica = $('#idAreaAcademica').val();
        var idPeriodo = $('#idPeriodo').val();
        
        $('#trTable2').find('th').remove();
        $('#materia').find('td').remove()
        $('#aviso').html('<br />');

        $.getJSON(context + '/consultarGrupoPlan', {
            idPlanEstudios: idPlanEstudios, 
            idAreaAcademica: idAreaAcademica,
            idPeriodo: idPeriodo,
            semestre: semestre
        }).done(function(data) {

            $('#idGrupo').find('option').remove();
            var selecciones = $('<option value="">Seleccione...</option>');
            $('#idGrupo').append(selecciones);
            $.each(data.grupos, function(posicion, grupo) {

                var opcion = $('<option value="' + grupo.idGrupo + '">' + grupo.nombreGrupo + '</option>')
                $('#idGrupo').append(opcion);
                });
                        
            $.each(data.materias, function(posicion, materia) {

                var tr = $('<tr>');
                            
                var materiaTd = $('<td>');
                var materiaLabel = $('<input class="form-control requerido" type="hidden" name="idMateria" id="idMateria" value="' + materia.idMateria + '"/>' + materia.nombreMateria);
                materiaTd.html(materia.nombreMateria);
                materiaTd.append(materiaLabel);                              
                $(tr).append(materiaTd);
                            
                var profesorTd = $('<td>');
                var selectProfesor = $('<select class="form-control requerido" name="idProfesor" id="idProfesor"></select>');
                var selecciones = $('<option value="">Seleccione...</option>');
                $(selectProfesor).append(selecciones);
                $.each(data.profesores, function(posicion1, profesor) {
                    console.log(profesor.nombreProfesor);
                    var profe = $('<option value="' + profesor.idProfesor + '">' + profesor.nombreProfesor +" "+ profesor.aPaterno+" "+ profesor.aMaterno+'</option>');
                    $(selectProfesor).append(profe);
                    });
                $(profesorTd).append(selectProfesor);
                $(tr).append(profesorTd);
                            
                var horasTd = $('<td></td>');
                var horasText = $('<input class="form-control requerido" id="horas" name="horas" type="number" />');
                $(horasTd).append(horasText);
                $(tr).append(horasTd);
                            
                var horarioTd = $('<td></td>');
                var horarioText = $('<input class="form-control requerido" id="horario" name="horario" type="text" />');
                $(horarioTd).append(horarioText);
                $(tr).append(horarioTd);
                            
                var AulaTd = $('<td>');
                var selectAula = $('<select class="form-control requerido" name="idAulaEdificio" id="idAulaEdificio"></select>');
                var selecciones = $('<option value="">Seleccione...</option>');
                $(selectAula).append(selecciones);
                $.each(data.aulas, function(posicion, aula) {
                    var aulas = $('<option value="' + aula.idAulaEdificio + '">' + aula.nombreEdificio + " - "+aula.nombreAula + '</option>');
                    $(selectAula).append(aulas);
                    });
                $(AulaTd).append(selectAula);
                $(tr).append(AulaTd);
                                                        
                $('#materia').append(tr);
                });
        });
                    
                                                
    });
                    
    $("#RegistraAccion").click(
        function(e) { 
                    
            var validacion = $('#form1').validate({
                rules: {
                    idPlanEstudios: {
                        required: true
                    },
                    idAreaAcademica: {
                        required: true
                    },
                    idPeriodo: {
                        required: true
                    },
                    semestre: {
                        required: true, 
                        maxlength: 20
                    },
                    idGrupo: {
                        required: true
                    }
                }
            });
            if (validacion.form()) {
                var error = 0;
                $(".requerido").css({
                    'border': '1px solid #ccc'
                });
                $('#aviso').html('');
                $('.requerido').each(function(i, elem) {
                    if ($(elem).val() == '' || /^\s+$/.test($(elem).val())) {
                        $(elem).css({
                            'border': '1px solid red'
                        });
                        error++;
                    }
                });
                if (error > 0) {
                    e.preventDefault();
                    $('#aviso').html('Debes llenar los campos requeridos y el campo horas es numérico <br />');
                } else if (error == 0) {
                    $('#form1').attr('action', context + "/registrarHorario");
                    $('#form1').submit();
                }
            }
                     
        });
                    
    $('.eliminar').click(
        function(e) {
            e.preventDefault();
            $('#form2').find('input, button, select').removeAttr("disabled");
            var idHo = $(this).data("id");
            reset();
            alertify.set({
                buttonReverse: true, 
                labels: {
                    ok: "Aceptar", 
                    cancel: "Cancelar"
                }
            });
            alertify.confirm("¿Estás seguro de eliminar el horario?", function(e) {
                if (e) {
                    //se envia el id que viene en el "data-id" del elemento clickeado al hidden idPlanEstudio y ejecuto el action correspondiente
                    $('#idHorarioM').val(idHo);
                    $('#form2').attr('action',context + "/eliminarHorario");
                    $('#form2').submit();
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
    
    
    $('.number').keypress(function(e) {
                if (e.charCode < 48 || e.charCode > 57)
            return false;
        });
    
}


