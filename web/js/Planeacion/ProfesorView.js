/*
 * @document ProfesorView
 * @author Adan Cuautle
 * @versión 10/07/2014
 */

function iniciar(contex) {
    var context = contex;

    $('#idAreaAcademicaM').multiSelect({
        selectableFooter: "<div class='custom-footer'>Lista áreas académicas</div>",
        selectionFooter: "<div class='custom-footer'>Lista áreas académicas asignadas</div>",
//        afterSelect: function(values) {
//            console.log(values);
//            var idDocumento = parseInt(values);
//            var idPrograma = $('#idDocumentoPrograma').val();
//            $("#cargandoAsignacion").fadeIn();
//            console.log(idDocumento+"-"+idPrograma);
//            $.post(context + "/registraAsignacionDocumentoPrograma", {
//                idDocumento: idDocumento,
//                idPrograma: idPrograma,
//                mensaje: "agregar"
//            }, function(data) {
//                if (data.mensaje === "correcto") {
//                    $("#cargandoAsignacion").fadeOut();
//                }
//
//            }, "json");
//        },
//        afterDeselect: function(values) {
//            console.log(values);
//            var idDocumento = parseInt(values);
//            var idPrograma = $('#idDocumentoPrograma').val();
//            $("#cargandoAsignacion").fadeIn();
//            console.log(idDocumento+"-"+idPrograma);
//            $.post(context + "/registraAsignacionDocumentoPrograma", {
//                idDocumento: idDocumento,
//                idPrograma: idPrograma,
//                mensaje: "eliminar"
//            }, function(data) {
//                if (data.mensaje === "correcto") {
//                    $("#cargandoAsignacion").fadeOut();
//                }
//
//            }, "json");
//        }
    });

    $('#idAreaAcademica').multiSelect({
        selectableFooter: "<div class='custom-footer'>Lista áreas académicas</div>",
        selectionFooter: "<div class='custom-footer'>Lista áreas académicas asignadas</div>",
    });

    $('#tablesProfesor').dataTable();
    $('#estado').change(function(e) {

        var idEstado = $(this).val();
        $.getJSON(context + '/consultaMunicipios', {
            idEstado: idEstado
        }).done(function(data) {

            $('#idMunicipios').find('option').remove();
            $('#idMunicipios').append($('<option value="" >Seleccione...</option>'));
            $.each(data.municipios, function(posicion, municipio) {
                var opcion = $('<option value="' + municipio.idMunicipio + '">' + municipio.nombreMunicipio + '</option>')
                $('#idMunicipios').append(opcion);
                });
        });
    });
//    funcion para recargar los municiopios al modificar estado del modulo Modificar-Profesor
    $('#MidEstado').change(function(e) {
        var idEstado = $(this).val();
        $.getJSON(context + '/consultaMunicipios', {
            idEstado: idEstado
        }).done(function(data) {
            $('#MidMunicipios').find('option').remove();
            $('#MidMunicipios').append($('<option value="" >Seleccione...</option>'));
            $.each(data.municipios, function(posicion, municipio) {
                var opcion = $('<option value="' + municipio.idMunicipio + '">' + municipio.nombreMunicipio + '</option>')
                $('#MidMunicipios').append(opcion);
                });
        });
    });
    $("#btnResgistra").click(function(e) {

        e.preventDefault();
        var validacion = $('#registraProfesor').validate({
            rules: {
                nombre: {required: true, maxlength: 200},
                estado: {required: true, min: 1},
                idAreaAcademica: {required: true},
                rfc: {minlength: 13},
                curp: {minlength: 18},
                edad: {number: true},
                noSeguroSocial: {number: true},
                telefono: {number: true, minlength: 10},
                idMunicipios: {required: true, min: 1}

            }, messages: {
                estado: {min: "Elije un estado"},
                idAreaAcademica: {required: "Elije una área académica"},
                telefono: {minlength: "Por favor introduzca lada y número."},
                idMunicipios: {min: "Elije un municipio"}
            }
        });
        if (validacion.form()) {
            $('#registraProfesor').submit();
        }
    });

//Calcula edad
    $('#registraProfesor').on('click', '#edad', function(e) {
        e.preventDefault();
        var fechaNacimiento = $("#fechaNacimiento").val();
        if (fechaNacimiento != "") {
            $.getJSON(context + '/calculaEdad.action', {
                fechaNacimiento: fechaNacimiento
            }, function(data) {
                $("#edad").val(data.edad);
            });
        }
    });
    //funcion para habilitar y deshabilitar un profesor
    $('#tablesProfesor tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idPersona = $(this).data("id");
        var status = $(this).data("estado");
        reset();
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        var estado;
        if (status !== true) {
            estado = "¿Estás seguro de habilitar el profesor?";
        } else {
            estado = "¿Estás seguro de deshabilitar el profesor?";
        }
        alertify.confirm(estado, function(e) {
            if (e) {
//envia el id que viene en el "data-id" del elemento seleccionado al hidden idPersona y ejecuta el action correspondiente
                $('#idPersona').val(idPersona);
                $('#status').val(status);
                $('#mostrarProfesor').attr('action', context + "/eliminaProfesor");
                $('#mostrarProfesor').submit();
            }
        });
//        return false;
    });
    $("#btnModifica").click(function(e) {
        e.preventDefault();

        var validacion = $('#modificaProfesor').validate({
            rules: {
                nombre: {required: true, maxlength: 200},
                idRol: {required: true, min: 1},
                estado: {required: true, min: 1},
                rfc: {minlength: 13},
                curp: {minlength: 18},
                edad: {number: true},
                noSeguroSocial: {number: true},
                telefono: {number: true, minlength: 10},
                idMunicipios: {required: true, min: 1}

            }, messages: {
                idRol: {min: "Elije tipo de cuenta"},
                estado: {min: "Elije un estado"},
                telefono: {minlength: "Por favor introduzca lada y número."},
                idMunicipios: {min: "Elije un municipio"}
            }
        });

        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el profesor?", function(e) {
                if (e) {
                    $('#modificaProfesor').submit();
                }
            });
        }
    });


    $('#tablesProfesor tbody').on('click', 'td .detalles', function(e) {
        e.preventDefault();
        var idProfesor = $(this).data("id");
        $.getJSON(context + '/muestraProfesor.action', {
            idProfesor: idProfesor
        }, function(data) {
           
            $("#Mnombre").val(data.profesor.nombre);
            $("#MapellidoPaterno").val(data.profesor.apellidoPaterno);
            $("#MapellidoMaterno").val(data.profesor.apellidoMaterno);
            $("#Mcalle").val(data.profesor.calle);
            $("#Mnumero").val(data.profesor.numero);
            $("#Mcp").val(data.profesor.cp);
//            Recarga estado y municipio del profesor
            $("#MidEstado").val(data.profesor.idEstados);


            $("#MidMunicipios").find("option").remove();
            var opt = $("<option>");
            opt.text("Seleccione...");
            $("#MidMunicipios").append(opt);
            $.each(data.municipios, function(posicion, municipio) {
                var opt = $("<option>");
                opt.text(municipio.nombreMunicipio);
                opt.val(municipio.idMunicipio);
                if (municipio.idMunicipio == data.profesor.idMunicipio) {
                    opt.attr("selected", "selected");
                }
                $("#MidMunicipios").append(opt);
            });

//             $('#modificaProfesor').find("#idAreaAcademicaM").attr("disabled");


            $('#idAreaAcademicaM').find("option").remove();

            cargarMult(data.areasAcademicasProfesor);


            $('#modificaProfesor').find('[name="sexo"]').filter('[value="' + data.profesor.sexo + '"]').attr('checked', true);
            $("#MfechaNacimiento").val(data.profesor.fechaNacimiento);
            $("#Medad").val(data.profesor.edad);
            $("#Mcurp").val(data.profesor.curp);
            $("#Mcolonia").val(data.profesor.colonia);
            $("#Mnacionalidad").val(data.profesor.nacionalidad);
            $("#MlugarNacimiento").val(data.profesor.lugarNacimiento);
            $("#MnoSeguroSocial").val(data.profesor.noSeguroSocial);
            $("#Mrfc").val(data.profesor.rfc);
            $("#MescuelaProcedencia").val(data.profesor.escuelaProcedencia);
            $("#Mescolaridad").val(data.profesor.escolaridad);
            $("#Mcorreo").val(data.profesor.correo);
            $('#modificaProfesor').find('[name="titulado"]').filter('[value="' + data.profesor.titulado + '"]').attr('checked', true);
            $("#Mtelefono").val(data.profesor.telefono);
            $("#Mclave").val(data.profesor.clave);
            $("#MfechaIngreso").val(data.profesor.fechaIngreso);
            $("#McedulaProfesional").val(data.profesor.cedulaProfesional);
            $("#MdocumentoMigratorio").val(data.profesor.documentoMigratorio);
            $("#Mobservaciones").val(data.profesor.observaciones);
            $("#btnModifica").css("display", "none");
            $("#botonCancelarModificar").css("display", "none");
            $('#AddButton').append($('<button>').attr("id", "btnMonstrar").attr("class", "btn btn-success").attr("type", "reset").text("Aceptar"));
            //Oculto el el boton de registrar y activo el boton de modificar y cancelar
            $("#modificarT").children("a.titulosToggle").click();
        });
    });


    function cargarMult(areasAcademicasProfesor) {


        $.each(areasAcademicasProfesor, function(posicion, areaProfesor) {

            console.log(areaProfesor.idAreaAcademica + " " + areaProfesor.nombreAreaAcademica + " " + areaProfesor.idprofesorAreaAcademica);
            var opcion = $("<option>");
            opcion.val(areaProfesor.idAreaAcademica);
            opcion.text(areaProfesor.nombreAreaAcademica);

            if (areaProfesor.idprofesorAreaAcademica !== 0) {
                opcion.attr("selected", true);
            }
            $('#idAreaAcademicaM').append(opcion);
        });

        $('#idAreaAcademicaM').multiSelect('refresh');
    }


    $('#modificaProfesor').on('click', '#btnMonstrar', function(e) {
        e.preventDefault();
        $("#mostrarT").children("a.titulosToggle").click();
        $('#idBody').click(function() {
// Recargo la página
            location.reload();
        });
    });


    $('#botonCancelarModificar').click(function(e) {
        e.preventDefault();

        $("#mostrarT").children("a.titulosToggle").click();
        $('#idBody').click(function() {
// Recargo la página
            location.reload();
        });
    });


    $('#tablesProfesor tbody').on('click', 'td .editar', function(e) {
        e.preventDefault();
        var idProfesor = $(this).data("id");
        $.getJSON(context + '/muestraProfesor.action', {
            idProfesor: idProfesor
        }, function(data) {
            $('#modificaProfesor').find('fieldset, select').removeAttr("disabled");
       
        $("#idAreaAcademicaM").removeAttr("disabled");
            $("#MidProfesor").val(data.profesor.idProfesor);
            $("#Mnombre").val(data.profesor.nombre);
            $("#MapellidoPaterno").val(data.profesor.apellidoPaterno);
            $("#MapellidoMaterno").val(data.profesor.apellidoMaterno);
            $("#Mcalle").val(data.profesor.calle);
            $("#Mnumero").val(data.profesor.numero);
            $("#Mcp").val(data.profesor.cp);
            $('#modificaProfesor').find('[name="sexo"]').filter('[value="' + data.profesor.sexo + '"]').attr('checked', true);
            $("#MfechaNacimiento").val(data.profesor.fechaNacimiento);
            $("#Medad").val(data.profesor.edad);
            $("#Mcurp").val(data.profesor.curp);
            $("#Mcolonia").val(data.profesor.colonia);
            $("#Mnacionalidad").val(data.profesor.nacionalidad);
            $("#MlugarNacimiento").val(data.profesor.lugarNacimiento);
            $("#MnoSeguroSocial").val(data.profesor.noSeguroSocial);
            $("#Mrfc").val(data.profesor.rfc);
            $("#MescuelaProcedencia").val(data.profesor.escuelaProcedencia);
            $("#Mescolaridad").val(data.profesor.escolaridad);
            $("#Mcorreo").val(data.profesor.correo);
            $("#Mtelefono").val(data.profesor.telefono);
            $("#MidEstado").val(data.profesor.idEstados);
            $("#MidMunicipios").find("option").remove();
            var opt = $("<option>");
            opt.text("Seleccione.ñ...");
            $("#MidMunicipios").append(opt);
            $.each(data.municipios, function(posicion, municipio) {
                var opt = $("<option>");
                opt.text(municipio.nombreMunicipio);
                opt.val(municipio.idMunicipio);
                if (municipio.idMunicipio == data.profesor.idMunicipio) {
                    opt.attr("selected", "selected");
                }
                $("#MidMunicipios").append(opt);
            });
             $('#idAreaAcademicaM').find("option").remove();

            cargarMult(data.areasAcademicasProfesor);

            
            $("#Mclave").val(data.profesor.clave);
            $("#MfechaIngreso").val(data.profesor.fechaIngreso);
            $('#modificaProfesor').find('[name="titulado"]').filter('[value="' + data.profesor.titulado + '"]').attr('checked', true);
            $("#Mtelefono").val(data.profesor.telefono);
            $("#McedulaProfesional").val(data.profesor.cedulaProfesional);
            $("#MdocumentoMigratorio").val(data.profesor.documentoMigratorio);
            $("#Mobservaciones").val(data.profesor.observaciones);
            //Oculta el el boton de registrar y activa el boton de modificar y cancelar
            $("#modificarT").children("a.titulosToggle").click();
        });
    });

    //se asigna a fecha inicial el datepicker
    $("#fechaNacimiento").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });
    $("#fechaIngreso").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });
    $("#MfechaNacimiento").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });
    $("#MfechaIngreso").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
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

}
