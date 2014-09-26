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

    $("#idActividad").change(function(e) {
        e.preventDefault();
        var id = $("#idActividad").val();
        if (id === "5") {
            $("#nombreMo").show();
        } else {
            $("#nombreMo").hide();
        }
    });

    //se registra una nueva generacion
    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var image = $("#img");

        var validacion = $('#form1').validate({
            rules: {
                fechaInicio: {required: true},
                fechaFin: {required: true},
                idGeneracion: {required: true, min: 1},
                idPeriodo: {required: true, min: 1},
                idActividad: {required: true, min: 1}
            }, messages: {
                idGeneracion: "Este campo es requerido.",
                idPeriodo: "Este campo es requerido.",
                idActividad: "Este campo es requerido."
            }
        });
        if (validacion.form()) {
            image.fadeIn();
            var datos = $("#form1").serialize();
            $.getJSON(contex + '/registraPanelControl', datos).done(function(data) {
                if (data.mensaje === "Se registró correctamente la actividad.") {
                    alertify.success("Se registró correctamente la actividad.");
                    $('#form1').submit();

                } else if (data.tabIdentificador === "La actividad ya se encuentra asignada a este periodo.") {
                    alertify.custom = alertify.extend("custom");
                    alertify.custom("La actividad ya se encuentra asignada a este periodo.");
                } else if (data.mensaje === "No se ha podido registrar la actividad.") {
                    alertify.error("No se ha podido registrar la actividad.");
                }
            });
        }
        image.fadeOut();
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

    $('#tablePanelControl tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();
        if ($(this).data("idactividad") === 5) {
            $.getJSON(contex + '/buscaGeneracion', {
                idPanelControl: $(this).data("id")
            }).done(function(data) {
                $.each(data.listaPanelcontrol, function(posicion, panelGeneracion) {
                    $("#idControlSolicitudM").val(panelGeneracion.idControlSolicitudAdmicion);
                    $("#idGeneracionM").val(panelGeneracion.idGeneracion);
                    $("#nombreMoM option[value=" + panelGeneracion.idGeneracion + "]").attr('selected', 'selected');
                });
            });
            $("#nombreMoM").show();
        } else {
            $("#nombreMoM").hide();
        }
        $('#form2').find('input, button, select').removeAttr("disabled");
        $("#idPanelControlM").val($(this).data("id"));
        $("#fechainicioM").val($(this).data("fechainicio"));
        $("#fechafinM").val($(this).data("fechafin"));
        $("#nombreM option[value=" + $(this).data("idactividad") + "]").attr('selected', 'selected');
        $("#cicloEscolarMo option[value=" + $(this).data("idperiodo") + "]").attr('selected', 'selected');
        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');
        $("#modificarT").children("a.titulosToggle").click();
    });

    $('#ModificarAccion').click(function(e) {
        e.preventDefault();
        $("#form2").removeAttr("action", "action");
        var actividad = $("#nombreM").val();
        if (actividad === "5") {
            $("#form2").attr("action", context + "/modificaControlSolicitud");
        } else {
            $("#form2").attr("action", context + "/modificaPanelControl");
        }
        var validacion = $('#form2').validate({
            rules: {
                fechaInicioM: {required: true},
                fechaFinM: {required: true},
                idPeriodo: {required: true, min: 1},
                idActividad: {required: true, min: 1},
                idGeneracion: {required: true, min: 1}
            }, messages: {
                idPeriodo: "Este campo es requerido.",
                idActividad: "Este campo es requerido.",
                idGeneracion: "Este campo es requerido."
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar la actividad?", function(e) {
                if (e) {
                    $("#form2").submit();
                }
            });
        }
    });

    $('#tablePanelControl tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idpanel = $(this).data("id");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar esta actividad?", function(e) {
            if (e) {

                $('#idPanelControl').val(idpanel);
                $('#form1').attr('action', context + "/eliminaPanelControl");
                $('#form1').submit();
            }
        });
        return false;
    });

    $('#Cancelar').click(function(e) {
        $('#form2').find('input, button, select').val('');
        $('#form2').find('option').removeAttr('selected', 'selected');
        $('#form2').find('input, button, select').attr("disabled", "disabled");
        $("#mostrarT").children("a.titulosToggle").click();
        $("#nombreMoM").hide();
    });
}