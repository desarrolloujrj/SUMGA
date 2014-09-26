/* 
 * @autor : Betsabe Cardenas
 * @version 26/06/2014
 */

function iniciar(contex) {
    var context = contex;
    $('#form2').find('input, button, select').attr("disabled", "disabled");

    $('#tableProgramaAcademico').dataTable();

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                "programaAcademico.nombreProgramaAcademico": {required: true, maxlength: 200},
                "programaAcademico.idAreaAcademica": {required: true},
                "programaAcademico.division": {required: true, maxlength: 200}
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
                "programaAcademico.nombreProgramaAcademico": {required: true, maxlength: 200},
                "programaAcademico.idAreaAcademica": {required: true},
                "programaAcademico.division": {required: true, maxlength: 200}
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el programa académico? ", function(e) {
                if (e) {
                    $('#form2').submit();
                } 
            });
            return false;
        }
    });

    $('#tableProgramaAcademico tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();
        $('#form2').find('input, button, select').removeAttr("disabled");

        $("#idProgramaAcademicoM").val($(this).data("id"));
        $("#nombreProgramaAcademicoM").val($(this).data("nombre"));
        $("#idAreaAcademicaM option[ value=" + $(this).data("area") + "]").attr('selected', 'selected');
        $("#divisionM").val($(this).data("division"));

        $("#modificarT").children("a.titulosToggle").click();
    });
    $('#tableProgramaAcademico tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idPrograma = $(this).data("id");
        $('#form2').find('input').removeAttr("disabled");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar el programa académico?", function(e) {
            if (e) {
                //envio el id que viene en el "data-id" del elemento clickeado al hidden idPlanEstudio y ejecuto el action correspondiente                                    
                $('#idProgramaAcademicoM').val(idPrograma);
                $('#form2').attr('action', context + "/eliminarProgramaAcademico");
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