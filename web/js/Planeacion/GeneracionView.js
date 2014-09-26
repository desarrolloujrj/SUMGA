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
                nombre: {required: true, maxlength: 35},
                numero: {required: true, maxlength: 30},
                fechainicio: {required: true, maxlength: 10},
                fechafin: {required: true, maxlength: 10}
            }
        });
        if (validacion.form()) {
            $('#form1').submit();
        }
    });

    //se le asigna a fecha inicial el datepicker
    $("#fechainicio").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });



    //se le asigna a fecha fin el datepicker
    $("#fechafin").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });

    //se le asigna a fecha inicial el datepicker
    $("#fechainicioM").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });
    //se le asigna a fecha fin el datepicker
    $("#fechafinM").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });

    $('#tablaGeneracion tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();
        $('#form2').find('input, button, select').removeAttr("disabled");
        $("#idGeneracionM").val($(this).data("id"));
        $("#nombreM").val($(this).data("nombre"));
        $("#numeroM").val($(this).data("numero"));
        $("#fechainicioM").val($(this).data("fechainicio"));
        $("#fechafinM").val($(this).data("fechafin"));
        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');
        $("#modificarT").children("a.titulosToggle").click();
    });

    $('#tablaGeneracion tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idgeneracion = $(this).data("id");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar la generación?", function(e) {
            if (e) {
                $('#idGeneracion').val(idgeneracion);
                $('#form1').attr('action', context + "/eliminarGeneracion");
                $('#form1').submit();
            }
        });
        return false;
    });

    $('#ModificarAccion').click(function(e) {
        e.preventDefault();
        var validacion = $('#form2').validate({
            rules: {
                nombreM: {required: true, maxlength: 30},
                numeroM: {required: true, maxlength: 30},
                fechainicioM: {required: true, maxlength: 10},
                fechafinM: {required: true, maxlength: 10}
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar la generación?", function(e) {
                if (e) {
                    $('#form2').submit();
                } 
            });
        }
    });

    $('#Cancelar').click(function(e) {
        $("#mostrarT").children("a.titulosToggle").click();
        $('#form2').find('input, button, select').val('');
        $('#form2').find('input, button, select').attr("disabled", "disabled");
        $("#form2").removeData('validator');
    });
}