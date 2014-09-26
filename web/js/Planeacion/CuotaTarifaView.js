function iniciar(contex) {
    var context = contex;

    $('#tablaCuotasTarifas').dataTable();

    $('#form2').find('input, button, select').attr("disabled", "disabled");

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                "cuotatarifa.concepto": {required: true, maxlength: 200},
                "cuotatarifa.idTipoCuota": {required: true},
                "cuotatarifa.cuota": {required: true, maxlength: 5, number: true},
                "cuotatarifa.descuentoINAPAM": {maxlength: 4},
                "cuotatarifa.descuento": {maxlength: 4},
                "cuotatarifa.pagosDiferidos": {maxlength: 2},
                "cuotatarifa.modulos": {maxlength: 2},
                "cuotatarifa.nivel": {maxlength: 2},
                "cuotatarifa.clave": {maxlength: 4}
            }
        });
        if (validacion.form()) {
            $('#form1').submit();
        }
    });

    $('#tablaCuotasTarifas tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();

        $('#form2').find('input, button, select').removeAttr("disabled");

        $("#idCuotaTarifaM").val($(this).data("id"));
        $("#conceptoM").val($(this).data("concepto"));
        $("#idTipoCuotaM option[value=" + $(this).data("tipocuota") + "]").attr('selected', 'selected');
        $("#cuotaM").val($(this).data("cuota"));
        $("#inapamM").val($(this).data("inapam"));
        $("#descuentoM").val($(this).data("descuento"));
        $("#pagosDiferidosM").val($(this).data("pagos"));
        $("#claveCuotaM").val($(this).data("clave"));
        $("#nivelCuotaM").val($(this).data("nivel"));
        $("#modulosM").val($(this).data("modulo"));
        $("#idProgramaAcademicoCuotaM option[value=" + $(this).data("programaacademico") + "]").attr('selected', 'selected');

        $("#modificarT").children("a.titulosToggle").click();
    });

    $('#ModificarAccion').click(function(e) {
        e.preventDefault();
        var validacion = $('#form2').validate({
            rules: {
                "cuotatarifa.concepto": {required: true, maxlength: 200},
                "cuotatarifa.idTipoCuota": {required: true},
                "cuotatarifa.cuota": {required: true, number: true, maxlength: 11},
                "cuotatarifa.descuentoINAPAM": {maxlength: 4},
                "cuotatarifa.descuento": {maxlength: 4},
                "cuotatarifa.pagosDiferidos": {maxlength: 2},
                "cuotatarifa.modulos": {maxlength: 2},
                "cuotatarifa.nivel": {maxlength: 2},
                "cuotatarifa.clave": {maxlength: 4}
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar la cuota?", function(e) {
                if (e) {
                    $('#form2').submit();
                } 
            });
        }
    });

    $('#tablaCuotasTarifas tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idCuotaTarifa = $(this).data("id");
        $('#form2').find('input').removeAttr("disabled");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar la cuota?", function(e) {
            if (e) {
                $('#idCuotaTarifaM').val(idCuotaTarifa);
                $('#form2').attr('action', context + "/eliminarCuotaTarifa");
                $('#form2').submit();
            }
        });
        return false;
    });

    $('#Cancelar').click(function(e) {
        $("#mostrarT").children("a.titulosToggle").click();

        $('#form2').find('input, button, select').val('');
        $('#form2').find('input, button, select').attr("disabled", "disabled");
    });

    $('#idTipoCuota').on('change', function(e) {
        e.preventDefault();
        var valor = $(this).val();
        /// valor 1 hace referencia a servicios escolares
        if (valor == 1) {
            $("#conceptoD").slideDown();
            $('#cuotaD').slideDown();


            $('#moduloD').slideUp();
            $('#inapamD').slideUp();
            $('#descuentoD').slideUp();
            $('#pagosdifD').slideUp();
            $('#claveD').slideUp();
            $('#nivelD').slideUp();
            $('#programaAcademicoD').slideUp();

            /// valor 2 hace referencia a servicios educativos   
        } else if (valor == 2) {
            $("#conceptoD").slideDown();
            $('#cuotaD').slideDown();
            $('#inapamD').slideDown();
            $('#descuentoD').slideDown();
            $('#pagosdifD').slideDown();
            $('#claveD').slideDown();
            $('#nivelD').slideDown();
            $('#programaAcademicoD').slideDown();


            $('#moduloD').slideUp();

            // valor 3 hace referencia a verano
        } else if (valor == 3) {
            $("#conceptoD").slideDown();
            $('#cuotaD').slideDown();
            $('#moduloD').slideDown();


            $('#inapamD').slideUp();
            $('#descuentoD').slideUp();
            $('#pagosdifD').slideUp();
            $('#claveD').slideUp();
            $('#nivelD').slideUp();
            $('#programaAcademicoD').slideUp();


        } else {
            $('#cuotaD').slideUp();
            $('#conceptoD').slideUp();
            $('#moduloD').slideUp();
            $('#inapamD').slideUp();
            $('#descuentoD').slideUp();
            $('#pagosdifD').slideUp();
            $('#claveD').slideUp();
            $('#nivelD').slideUp();
            $('#programaAcademicoD').slideUp();

        }
    });

    $('.number').keypress(function(e) {
                if (e.charCode < 48 || e.charCode > 57)
            return false;
        });
}

