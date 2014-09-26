/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function inicio(contex) {
    
    var context = contex;
    
    $('#form2').find('input, button, select').attr("disabled", "disabled");
    
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
                    idProfesor: {
                        required: true
                    },
                    horas: {
                        required: true, 
                        maxlength: 20,
                        number:true
                    },
                    horario: {
                        required: true, 
                        maxlength: 200
                    },
                    idAulaEdificio: {
                        required: true
                    },
                    idIdioma: {
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
                        //envio el id que viene en el "data-id" del elemento clickeado al hidden idPlanEstudio y ejecuto el action correspondiente
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
        var tipo = $('#tipo').val();
        
        $('#trTable2').find('th').remove();
        $('#materia').find('td').remove()
        $('#aviso').html('<br />');
        
        if(tipo == 1){

            $.getJSON(context + '/consultarMateriasOptativa', {
                idPlanEstudios: idPlanEstudios, 
                semestre: semestre
            }).done(function(data) {

                $('#idMateria').find('option').remove();
                var selecciones = $('<option value="">Seleccione...</option>');
                $('#idMateria').append(selecciones);
                $.each(data.materiasOptativas, function(posicion, materia) {

                    var opcion = $('<option value="' + materia.idMateria + '">' + materia.nombreMateria + '</option>')
                    $('#idMateria').append(opcion);
                    });
            });
        }else if(tipo == 2){
            $.getJSON(context + '/consultarMateriasEspecialidad', {
                idPlanEstudios: idPlanEstudios, 
                semestre: semestre
            }).done(function(data) {

                $('#idMateria').find('option').remove();
                var selecciones = $('<option value="">Seleccione...</option>');
                $('#idMateria').append(selecciones);
                $.each(data.materiasEspecialidad, function(posicion, materia) {

                    var opcion = $('<option value="' + materia.idMateria + '">' + materia.nombreMateria + '</option>')
                    $('#idMateria').append(opcion);
                    });
            });
        }else if(tipo == 3){
            
            $.getJSON(context + '/consultarMateriasIdioma', {
                idPlanEstudios: idPlanEstudios, 
                semestre: semestre
            }).done(function(data) {

                $('#idMateria').find('option').remove();
                var selecciones = $('<option value="">Seleccione...</option>');
                $('#idMateria').append(selecciones);
                $.each(data.materiasIdioma, function(posicion, materia) {

                    var opcion = $('<option value="' + materia.idMateria + '">' + materia.nombreMateria + '</option>')
                    $('#idMateria').append(opcion);
                    });
            });
            
        }
    }); 
    
    $('#numeroHorario').change(function(e) {
        var numeroHorario = $(this).val();
        var semestre = $('#semestre').val();
        var idPlanEstudios = $('#idPlanEstudios').val();
        var idAreaAcademica = $('#idAreaAcademica').val();
        var tipo = $('#tipo').val();
        
        $('#trTable2').find('th').remove();
        $('#materia').find('td').remove();
        $('#aviso').html('<br />');
        
        if(tipo == 1){
            
            var th1 = $('<th>Optativa *</th>');
            $('#trTable2').append(th1);
            var th2 = $('<th>Profesor *</th>');
            $('#trTable2').append(th2);
            var th3 = $('<th>Horas clase *</th>');
            $('#trTable2').append(th3);
            var th4 = $('<th>Horario *</th>');
            $('#trTable2').append(th4);
            var th5 = $('<th>Salón *</th>');
            $('#trTable2').append(th5);
                        
            $.getJSON(context + '/consultarOptativa', {
                semestre: semestre, 
                idAreaAcademica: idAreaAcademica,
                idPlanEstudios: idPlanEstudios
            }).done(function(data) {
                for (i = 0; i < numeroHorario; i++) {
                    
                    var tr = $('<tr>');                
                            
                    var optativaTd = $('<td>');
                    var selectOptativa = $('<select class="form-control requerido" name="idOptativas" id="idOptativas"></select>');
                    var selecciones = $('<option value="">Seleccione...</option>');
                    $(selectOptativa).append(selecciones);
                    $.each(data.optativas, function(posicion3, optativa) {
                        var optativa = $('<option value="' + optativa.idOptativas + '">' + optativa.nombreOptativa +'</option>');
                        $(selectOptativa).append(optativa);
                        });
                    $(optativaTd).append(selectOptativa);
                    $(tr).append(optativaTd);
                            
                    var profesorTd = $('<td>');
                    var selectProfesor = $('<select class="form-control requerido" name="idProfesor" id="idProfesor"></select>');
                    var selecciones = $('<option value="">Seleccione...</option>');
                    $(selectProfesor).append(selecciones);
                    $.each(data.profesores, function(posicion1, profesor) {
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
                    };       
            });
        }else if(tipo == 2){
            
            var th1 = $('<th>Especialidad *</th>');
            $('#trTable2').append(th1);
            var th2 = $('<th>Profesor *</th>');
            $('#trTable2').append(th2);
            var th3 = $('<th>Horas clase *</th>');
            $('#trTable2').append(th3);
            var th4 = $('<th>Horario *</th>');
            $('#trTable2').append(th4);
            var th5 = $('<th>Salón *</th>');
            $('#trTable2').append(th5);
            
            $.getJSON(context + '/consultarEspecialidad', {
                semestre: semestre, 
                idAreaAcademica: idAreaAcademica,
                idPlanEstudios: idPlanEstudios
            }).done(function(data) {
                                                               
                for (i = 0; i < numeroHorario; i++) {

                    var tr = $('<tr>');   
                            
                    var especialidadTd = $('<td>');
                    var selectespecialidad = $('<select class="form-control requerido" name="idEspecialidades" id="idEspecialidades"></select>');
                    var selecciones = $('<option value="">Seleccione...</option>');
                    $(selectespecialidad).append(selecciones);
                    $.each(data.especialidades, function(posicion6, espe) {
                        var especialidad = $('<option value="' + espe.idEspecialidades + '">' + espe.nombreEspecialidad +'</option>');
                        $(selectespecialidad).append(especialidad);
                        });
                    $(especialidadTd).append(selectespecialidad);
                    $(tr).append(especialidadTd);
                            
                    var profesorTd = $('<td>');
                    var selectProfesor = $('<select class="form-control requerido" name="idProfesor" id="idProfesor"></select>');
                    var selecciones = $('<option value="">Seleccione...</option>');
                    $(selectProfesor).append(selecciones);
                    $.each(data.profesores, function(posicion1, profesor) {
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
                    };
            });
        }else if(tipo == 3){
            var th1 = $('<th>Idioma *</th>');
            $('#trTable2').append(th1);
            var th2 = $('<th>Profesor *</th>');
            $('#trTable2').append(th2);
            var th3 = $('<th>Horas clase *</th>');
            $('#trTable2').append(th3);
            var th4 = $('<th>Horario *</th>');
            $('#trTable2').append(th4);
            var th5 = $('<th>Salón *</th>');
            $('#trTable2').append(th5);
            
            $.getJSON(context + '/consultarIdioma', {
                semestre: semestre, 
                idAreaAcademica: idAreaAcademica,
                idPlanEstudios: idPlanEstudios
            }).done(function(data) {
                                                               
                for (i = 0; i < numeroHorario; i++) {

                    var tr = $('<tr>');   
                            
                    var idiomaTd = $('<td>');
                    var selectidioma = $('<select class="form-control requerido" name="idIdioma" id="idIdioma"></select>');
                    var selecciones = $('<option value="">Seleccione...</option>');
                    $(selectidioma).append(selecciones);
                    $.each(data.idiomas, function(posicion7, idioma) {
                        var idiomaOption = $('<option value="' + idioma.idIdioma + '">' + idioma.nombreIdioma +'</option>');
                        $(selectidioma).append(idiomaOption);
                        });
                    $(idiomaTd).append(selectidioma);
                    $(tr).append(idiomaTd);
                            
                    var profesorTd = $('<td>');
                    var selectProfesor = $('<select class="form-control requerido" name="idProfesor" id="idProfesor"></select>');
                    var selecciones = $('<option value="">Seleccione...</option>');
                    $(selectProfesor).append(selecciones);
                    $.each(data.profesores, function(posicion1, profesor) {
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
                    };
            });
        }
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
                        required: true
                    },
                    idMateria: {
                        required: true
                    },
                    tipo: {
                        required: true
                    },                    
                    numeroHorario: {
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
                
                    var tipo = $('#tipo').val();
                
                    if(tipo == 1){
           
                        $('#form1').attr('action', context + "/registrarHorarioOptativa");
                        $('#form1').submit();
            
                    }else if(tipo == 2){
           
                        $('#form1').attr('action', context + "/registrarHorarioEspecialidad");
                        $('#form1').submit();
            
                    }else if(tipo == 3){
            
                        $('#form1').attr('action', context + "/registrarHorarioIdioma");
                        $('#form1').submit();
            
                    }else{
                        alert(context);
                    }
                }
            }

        }); 
    
    $(".eliminar").click(
        function(e) {
            e.preventDefault();
            $('#form2').find('input, button, select').removeAttr("disabled");
            var idHI = $(this).data("id");
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
                    $('#idHorarioIdiomaM').val(idHI);
                    $('#form2').attr('action', context + "/eliminarHorarioIdioma");
                    $('#form2').submit();
                } else {
                   
                }
            });
            return false;

        });
        
    $(".modificar").click(
        function(e) {
            e.preventDefault();
            $('#form2').find('input, button, select').removeAttr("disabled");
            var idHorarioIdioma = $(this).data("id");
            var idProfesor = $(this).data("profesor");
                        
            $.getJSON(context + '/consultarProfesorHorarioIdioma', {
                idHorarioIdioma: idHorarioIdioma
            }).done(function(data) {

                $('#idProfesorM').find('option').remove();
                var selecciones = $('<option value="">Seleccione...</option>');
                $('#idProfesorM').append(selecciones);
                $.each(data.prof, function(posicion, profesor) {

                    var opcion = $('<option value="' + profesor.idProfesor + '">' + profesor.nombreProfesor +'</option>')
                    if(idProfesor==profesor.idProfesor){
                        opcion.attr("selected",true);
                    }
                    $('#idProfesorM').append(opcion);
                    });
            });
                        

            //Subo los valores a los input's
            $("#idHorarioIdiomaM").val($(this).data("id"));
            $("#nombreMateriaM").val($(this).data("nombremateria"));
            $("#idIdiomaM").val($(this).data("idioma"));
            $("#nombrePlanEstudiosM").val($(this).data("nombreplanestudios"));
            $("#idProfesorM").val($(this).data("profesor"));
            $("#horarioM").val($(this).data("horario"));
            $("#horasM").val($(this).data("horas"));
            $("#idAulaEdificioM").val($(this).data("aula"));
            $("#idPeriodoM").val($(this).data("periodo"));

            //Oculto el el boton de registrar y activo el boton de modificar y cancelar
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

    $('#idPeriodoTipoE').change(function(e){
        
        var seleccionTipo = $('#seleccionTipoE').val();
        
        if(seleccionTipo == 1){
                        
            $('#form7').attr('action', context + "/consultarHorarioEspecialidad");
            $('#form7').submit();
            
        }else if(seleccionTipo == 2){
            
            $('#form7').attr('action', context + "/consultarHorarioIdioma");
            $('#form7').submit();
            
        }else if(seleccionTipo == 3){
            
            $('#form7').attr('action', context + "/consultarHorarioOptativa");
            $('#form7').submit();
            
        }
        
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
    
}
