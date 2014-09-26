/* 
 * @autor: Betsabe Cardenas
 * @version : 26/06/2014
 */

function iniciar(contex) {
    var context = contex;
    $('#aasignacionDoc').unbind();
    $('#form2').unbind();
    $('#guardarAsignacion');
    $('#idDocumentoPrograma').unbind();
    $('#RegistraAccion').unbind();
    $('#ModificarAccion').unbind();
    $('#tableDocumentos tbody').unbind();
    $('#Cancelar').unbind();

    $('#tableDocumentos').dataTable();

    $('#asignacionDoc').multiSelect({
        selectableHeader: "<div class='custom-header'>Documentos no asignados</div>",
        selectionHeader: "<div class='custom-header'>Documentos asignados</div>",
        afterSelect: function(values) {
            console.log(values);
            var idDocumento = parseInt(values);
            var idPrograma = $('#idDocumentoPrograma').val();
            $("#cargandoAsignacion").fadeIn();
            console.log(idDocumento+"-"+idPrograma);
            $.post(context + "/registraAsignacionDocumentoPrograma", {
                idDocumento: idDocumento,
                idPrograma: idPrograma,
                mensaje: "agregar"
            }, function(data) {
                if (data.mensaje === "correcto") {
                    $("#cargandoAsignacion").fadeOut();
                }

            }, "json");
        },
        afterDeselect: function(values) {
            console.log(values);
            var idDocumento = parseInt(values);
            var idPrograma = $('#idDocumentoPrograma').val();
            $("#cargandoAsignacion").fadeIn();
            console.log(idDocumento+"-"+idPrograma);
            $.post(context + "/registraAsignacionDocumentoPrograma", {
                idDocumento: idDocumento,
                idPrograma: idPrograma,
                mensaje: "eliminar"
            }, function(data) {
                if (data.mensaje === "correcto") {
                    $("#cargandoAsignacion").fadeOut();
                }

            }, "json");
        }
    });


    $('#form2').find('input, button, select').attr("disabled", "disabled");


    $('#guardarAsignacion').click(function(e) {
        e.preventDefault();
        $('#formAsignacionDoc').attr("action", context + "/registraAsignacionDocumentoPrograma");
        $('#formAsignacionDoc').submit();
    });

    $('#idDocumentoPrograma').change(function(e) {
        e.preventDefault();
        var idPrograma = $(this).val();
        if(idPrograma > 0){
            $.getJSON(context + '/consultarDocumentoPrograma', {
            idPrograma: idPrograma
        }).done(function(data) {

            $('#asignacionDoc').find("option").remove();

            $.each(data.listaDocumentoPrograma, function(p, documentoPrograma) {
                var opcion = $("<option>");
                opcion.val(documentoPrograma.idDocumento);
                opcion.text(documentoPrograma.nombre);
                if (documentoPrograma.idDocumentoProgramaAcademico !== 0) {
                    opcion.attr("selected", true);
                }

                $('#asignacionDoc').append(opcion);
                });
            $('#asignacionDoc').multiSelect('refresh');
        });
        }else{
            $('#asignacionDoc').find("option").remove();
             $('#asignacionDoc').multiSelect('refresh');
        }
        


        iniciar(context);
    });



    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                nombre: {required: true, maxlength: 200}
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
                nombre: {required: true, maxlength: 200}
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el documento?", function(e) {
                if (e) {
                    $('#form2').submit();
                }
            });
        }
    });

    $('#tableDocumentos tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();

        $('#form2').find('input, button, select').removeAttr("disabled");

        $("#idDocumentoM").val($(this).data("id"));
        $("#nombreM").val($(this).data("nombre"));
        $("#statusM option[value=" + $(this).data("estado") + "]").attr('selected', 'selected');

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


    $('#tableDocumentos tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idDocumento = $(this).data("id");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar el documento", function(e) {
            if (e) {
                $('#idDocumento').val(idDocumento);
                $('#form1').attr('action', context + "/eliminarDocumento");
                $('#form1').submit();
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
}


