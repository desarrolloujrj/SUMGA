/* 
 * @autor Betsabe Cardenas
 * @version 27/06/2014
 */
function iniciar(contex) {
    var context = contex;

    $('#form2').find('input, button, select').attr("disabled", "disabled");

    $('#tablaOptativa').dataTable();

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                "optativaBean.nombreOptativa": {required: true, maxlength: 45},
                "optativaBean.semestre": {required: true},
                "optativaBean.idPlanEstudio": {required: true},
                "optativaBean.clave": {required: true}
            }
        });
        if (validacion.form()) {
            $('#form1').submit();
        }
    });

    $('#ModificarAccion').click(function(e) {
        e.preventDefault();
        var validacion = $('#form2').validate({
            rules: {
                "optativaBean.nombreOptativa": {required: true, maxlength: 45},
                "optativaBean.semestre": {required: true},
                "optativaBean.idPlanEstudio": {required: true},
                "optativaBean.clave": {required: true}
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar la optativa?", function(e) {
                if (e) {
                    $('#form2').submit();
                } 
            });
        }
    });

    $('#tablaOptativa tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();

        $('#form2').find('input, button, select').removeAttr("disabled");
        var idPlanEstudio = $(this).data("plan");
        var semestre = $(this).data("periodo");
        $.getJSON(context + '/consultaSemestresGrupo', {
            idPlanEstudios: idPlanEstudio
        }).done(function(data) {
            $('#semestreM').find('option').remove();
            var selecciones = $('<option value="">Seleccione...</option>');
            $('#semestreM').append(selecciones);

            for (i = 1; i <= data.numeroSemestres; i++) {
                var opcion = $('<option value="' + i + '">' + i + '</option>');
                if (semestre == i) {
                    opcion.attr('selected', 'selected');
                }
                $('#semestreM').append(opcion);
            }
        });

        $("#idOptativaM").val($(this).data("id"));
        $("#nombreOptativaM").val($(this).data("nombre"));
        $("#seriacionM").val($(this).data("seriacion"));
        $("#claveM").val($(this).data("clave"));
        $("#semestreM").val($(this).data("periodo"));
        $("#idPlanEstudioM option[value=" + $(this).data("plan") + "]").attr('selected', 'selected');
        $("#estadoM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');

        $("#mostrarT").removeClass('active');
        $("#mostrarT").removeClass('in');
        $("#mostrar").removeClass('active');
        $("#registrar").removeClass('active');
        $("#registrarT").removeClass('active');
        $("#registrarT").removeClass('in');
        $("#modificarT").addClass('active');
        $("#modificarT").addClass('in');
        $("#modificar").addClass('active');
    });


    $('#tablaOptativa tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idOptativa = $(this).data("id");
        $('#form2').find('input, button').removeAttr("disabled");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estas seguro de eliminar la optativa?", function(e) {
            if (e) {
                $('#idOptativaM').val(idOptativa);
                $('#form2').attr('action', context + "/eliminarOptativa");
                $('#form2').submit();
            } 
        });
        return false;
    });

    $('#Cancelar').click(function(e) {
        $('#modificarT').removeClass('active');
        $('#modificar').removeClass('active');
        $('#registrar').removeClass('active');
        $('#registrarT').removeClass('active');
        $('#mostrarT').addClass('active');
        $('#mostrar').addClass('active');
        $('#mostrar').addClass('in');

        $('#form2').find('input, button, select').val('');
        $('#form2').find('input, button, select').attr("disabled", "disabled");
    });

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


