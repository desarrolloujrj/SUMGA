/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * @version 12-jun-2014, 14:05:16
 * @author Uriel Jonnathan Ramirez Juarez
 */

function inicio(contex) {

    var context = contex;

    //se deshabilita el #form2
    $('#form2').find('input, button, select').attr("disabled", "disabled");

    //se registra una nueva generacion
    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                cicloEscolar: {required: true, maxlength: 40},
                fechaInicio: {required: true},
                fechaFin: {required: true}
            }
        });
        if (validacion.form()) {
            $('#form1').submit();
        }
    });

    //se le asigna a fecha inicial el datepicker
    $("#fechaInicio").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });

    //se le asigna a fecha fin el datepicker
    $("#fechaFin").datetimepicker({
         language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });

    //se le asigna a fecha inicial el datepicker
    $("#fechaInicioM").datetimepicker({
         language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });

    //se le asigna a fecha fin el datepicker
    $("#fechaFinM").datetimepicker({
         language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });

    $('#tableperiodo tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();

        $('#form2').find('input, button, select').removeAttr("disabled");

        $("#idPeriodoM").val($(this).data("idperiodo"));
        $("#fechaInicioM").val($(this).data("fechainicio"));
        $("#fechaFinM").val($(this).data("fechafin"));
        $("#cicloEscolarM").val($(this).data("cicloescolar"));

        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');
        $("#modificarT").children("a.titulosToggle").click();
    });

    $('#ModificarAccion').click(function(e) {
        e.preventDefault();
        var validacion = $('#form2').validate({
            rules: {
                fechaInicioM: {required: true},
                fechaFinM: {required: true},
                cicloEscolarM: {required: true, maxlength: 40}

            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el periodo?", function(e) {
                if (e) {
                    $('#form2').submit();
                }
            });
        }
    });

    $('#tableperiodo tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idgeneracion = $(this).data("idperiodo");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar el periodo?", function(e) {
            if (e) {
                $('#idperiodo').val(idgeneracion);
                $('#form1').attr('action', context + "/eliminarPeriodo");
                $('#form1').submit();
            }
        });
        return false;
    });

    $('#Cancelar').click(function(e) {
        $("#mostrarT").children("a.titulosToggle").click();
        $('#form2').find('input, button, select').val('');
        $('#form2').find('input, button, select').attr("disabled", "disabled");
    });
}