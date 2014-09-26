/* 
 * @autor: Betsabe Cardenas
 * @version : 25/06/2014
 */
function iniciar(contex) {
    var context = contex;

    $('#tableAreas').dataTable();

    $('#form2').find('input, button, select').attr("disabled", "disabled");

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                "areaAcademica.nombreAreaAcademica": {required: true, maxlength: 200},
                "areaAcademica.claveAreaAcademica": {required: true, maxlength: 15}
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
                "areaAcademica.nombreAreaAcademica": {required: true, maxlength: 200},
                "areaAcademica.claveAreaAcademica": {required: true, maxlength: 15}
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el área académica?", function(e) {
                if (e) {
                    $('#form2').submit();
                } 
            });
        }
    });

    $('#tableAreas tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();

        $('#form2').find('input, button, select').removeAttr("disabled");

        $("#idAreaAcademicaM").val($(this).data("id"));
        $("#nombreAreaAcademicaM").val($(this).data("nombre"));
        $("#claveAreaAcademicaM").val($(this).data("clave"));
        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');

        $("#modificarT").children("a.titulosToggle").click();
    });


    $('#tableAreas tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idAreaAcademica = $(this).data("id");
        $('#form2').find('input, button, select').removeAttr("disabled");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar el área académica?", function(e) {
            if (e) {
                $('#idAreaAcademicaM').val(idAreaAcademica);
                $('#form2').attr('action', context + "/eliminarAreaAcademica");
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
}

