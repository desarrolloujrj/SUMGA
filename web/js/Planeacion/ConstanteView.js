/* 
 * @autor : Betsabe Cardenas
 * @version : 25/06/2014
 */



function iniciar(contex) {
    var context = contex;
    $('#form2').find('input, button, select').attr("disabled", "disabled");

    $('#tableConstantes').dataTable();

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                "constanteBean.nombre": {required: true, maxlength: 200},
                "constanteBean.idCargo": {required: true},
                "constanteBean.titulo": {required: true, maxlength: 200}
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
                "constanteBean.nombre": {required: true, maxlength: 200},
                "constanteBean.idCargo": {required: true},
                "constanteBean.titulo": {required: true, maxlength: 200}
            }
        });

        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar la constante?", function(e) {
                if (e) {
                    $('#form2').submit();
                }
            });
        }
    });

    $('#tableConstantes tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();

        $('#form2').find('input, button, select').removeAttr("disabled");

        $("#idConstanteM").val($(this).data("id"));
        $("#nombreM").val($(this).data("nombre"));
        $("#cargoM").val($(this).data("cargo"));
        $("#tituloM").val($(this).data("titulo"));

        $("#modificarT").children("a.titulosToggle").click();
    });

    $('#tableConstantes tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idConstante = $(this).data("id");
        $('#form2').find('input').removeAttr("disabled");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar la constante?", function(e) {
            if (e) {
                $('#idConstanteM').val(idConstante);
                $('#form2').attr('action', context + "/eliminarConstante");
                $('#form2').submit();
            }
        });
        return false;
    });

    $('#Cancelar').click(
            function(e) {
                $("#mostrarT").children("a.titulosToggle").click();

                $('#form2').find('input, button, select').val('');
                $('#form2').find('input, button, select').attr("disabled", "disabled");
            });
}

