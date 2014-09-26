/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * @autor: Uriel Jonnathan Ramírez Juárez
 * @version : 08/07/2014
 * 
 */

function iniciar(contex) {

    var context = contex;

    var t = $('#tablaSelecionAspirantes').DataTable();

    $("#idPeriodo").change(function(e) {
        t.row("tr").remove().draw(false);
        var idPeriodo = $(this).val();
        var idProgramaAcademico = $("idProgramaAcademico").val();
        $.getJSON(contex + '/consultaAreaAcademica', {
            idPeriodo: idPeriodo,
            idProgramaAcademico: idProgramaAcademico
        }).done(function(data) {
            $('#idAreaAcademica').find('option').remove();
            $('#tablaSoli').find('tr').remove();
            var selecciones = $('<option value="0">Seleccione...</option>');
            $('#idAreaAcademica').append(selecciones);
            $.each(data.listaAcademica, function(posicion, academia) {
                var opcion = $('<option value="' + academia.idAreaAcademica + '">' + academia.nombreAreaAcademica + '</option>');
                $('#idAreaAcademica').append(opcion);
                });
            if (data.status === false) {
                if (idPeriodo === "0") {
                    $('#reporte').attr("disabled", "disabled");
                    $('#idAreaAcademica').attr("disabled", "disabled");
                } else {
                    $('#idAreaAcademica').attr("disabled", "disabled");
                    $('#reporte').attr("disabled", "disabled");
                    alertify.alert("No te encuentras en periodo de seleccion de aspirantes");
                }
            } else {
                $('#idAreaAcademica').removeAttr("disabled", "disable");
                $('#alert').attr("hidden", "hidden");
            }
        });
    });

    $('#idAreaAcademica').attr("disabled", "disabled");

    $("#idAreaAcademica").change(function(e) {
        var idAreaAcademica = $(this).val();
        var idPeriodo = $("#idPeriodo").val();
        $.getJSON(contex + '/consultaAspirantes', {
            idAreaAcademica: idAreaAcademica,
            idPeriodo: idPeriodo
        }).done(function(data) {
            createTable(data.listaCandidatos, data.cuentasColocacion);
        });
    });

    $('#tablaSelecionAspirantes tbody').on('click', 'td .modificar', function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        $("#idboton").val("b" + id);
        var vali = "s" + id;
        var estado = $("#" + vali).val();
        if (estado === "") {
            $("#" + vali).focus();
            alertify.error("Debe asignar un estado para guardar");
        }

        else if (estado === "Pago-Pendiente") {
            $("#" + vali).focus();
            alertify.error("No puedes asignar pago pendiente");
        }

        else if (estado === "Pago-Revision") {
            $("#" + vali).focus();
            alertify.error("No puedes asignar pago en revision");
        }

        else if (estado === "Pago-Rechazado") {
            $("#" + vali).focus();
            alertify.error("No puedes asignar pago rechazado");
        }

        else {
            $("#idSolicitudIngresoR").val($(this).data("id"));
            $("#comentarioR").val($("#t" + id).val());
            $("#estadoR").val($("#s" + id).val());
            $("#idPeriodoR").val($("#idPeriodo").val());
            $("#idAreaR").val($("#idAreaAcademica").val());
            $("#idAlumnoR").val($(this).data("idalumno"));
            var datos = $("#form1").serialize();
            $.getJSON(contex + '/validarCandidato', datos).done(function(data) {
                if (data.mensaje === "AreaConNiveles") {
                    if (data.status === true) {
                        $("#AsignaColocacion").val("Modificar");
                        $.each(data.colocacionusuario, function(posicion, coloca) {
                            $("#area").val(coloca.idProgramaAcademico);
                            $("#numcol").val(coloca.numeroColocacion);
                            $("#comen").val(coloca.comentariocolocacion);
                            $("#idProgramaAcademico option[value=" + coloca.idProgramaAcademico + "]").attr('selected', 'selected');
                            $("#nivelColocacion option[value=" + coloca.numeroColocacion + "]").attr('selected', 'selected');
                            $("#comentarioColocacion").val(coloca.comentariocolocacion);
                        });

                    } else {
                        $("#AsignaColocacion").val("Guardar");
                    }
                    if (data.mensaje === "AreaConNiveles" && $("#s" + id).val() === "Aceptado") {
                        $('#myModal').modal({
                            show: true,
                            keyboard: false,
                            static: true,
                            backdrop: false
                        });
                        $('#idProgramaAcademico').find('option').remove();
                        $.each(data.nombresPrograma, function(posicion, nombre) {
                            var opcion = $('<option  value="' + nombre.idProgramaAcademico + '">' + nombre.nombreProgramaAcademico + '</option>');
                            $('#idProgramaAcademico').append(opcion);
                        });
                    } else {
                        var dato = $("#form1").serialize();
                        $.getJSON(contex + '/sinColocacion', dato).done(function(data) {
                            if (data.mensaje === "Correcto") {
                                alertify.success("Se actualizó correctamente la informacion");
                            } else if (data.mensaje === "Incorrecto") {
                                alertify.success("No se ha podido registrar la informacion");
                            }
                        });
                    }
                } else if (data.mensaje === "Correcto") {
                    alertify.success("Se actualizó correctamente la informacion");
                } else if (data.mensaje === "Incorrecto") {
                    alertify.success("No se ha podido registrar la informacion");
                }
            }
            );
        }
    });

    $('#reporte').attr("disabled", "disabled");

    $("#AsignaColocacion").on('click', function(e) {
        e.preventDefault();
        var botModal = $("#AsignaColocacion").val();
        var botTabla = $("#idboton").val();
        var texto = $("#" + botTabla).val();
        if (botModal === "Modificar" && texto === "Modificar") {

            var validacion = $('#formColocacion').validate({
                rules: {
                    idProgramaAcademico: {required: true, min: 1},
                    nivelColocacion: {required: true, min: 1},
                    comentarioColocacion: {required: true}
                }, messages: {
                    idProgramaAcademico: "Este campo es requerido.",
                    nivelColocacion: "Este campo es requerido."
                }
            });
            if (validacion.form()) {
                var idPrograma = $("#idProgramaAcademico").val();
                var numero = $("#nivelColocacion").val();
                var comentariocoloca = $("#comentarioColocacion").val();
                var idsolicitud = $(".modificar").data("id");
                var comentario = $("#t" + idsolicitud).val();
                var estado = $("#s" + idsolicitud).val();
                var datos = $("#form1").serialize();

                $.getJSON(contex + '/actualizarColocacion', datos + "&nivelColocacion=" + numero + "&comentarioColocacion=" + comentariocoloca + "&idProgramaAcademico=" + idPrograma).done(function(data) {
                    if (data.mensaje === "Correcto") {
                        alertify.success("Se actualizó correctamente la informacion");
                    } else {
                        alertify.error("No se ha podido registrar la informacion");
                    }
                });
                limpiamodals();
                $('#myModal').modal('hide');
            }

        } else {

            var validacion = $('#formColocacion').validate({
                rules: {
                    idProgramaAcademico: {required: true, min: 1},
                    nivelColocacion: {required: true, min: 1},
                    comentarioColocacion: {required: true}
                }, messages: {
                    idProgramaAcademico: "Este campo es requerido.",
                    nivelColocacion: "Este campo es requerido."
                }
            });
            if (validacion.form()) {
                var idPrograma = $("#idProgramaAcademico").val();
                var numero = $("#nivelColocacion").val();
                var comentariocoloca = $("#comentarioColocacion").val();
                var idsolicitud = $(".modificar").data("id");
                var comentario = $("#t" + idsolicitud).val();
                var estado = $("#s" + idsolicitud).val();
                var datos = $("#form1").serialize();
                $.getJSON(contex + '/guardaColocacion?nivelColocacion=' + numero + '&comentarioColocacion=' + comentariocoloca
                        + '&idProgramaAcademico=' + idPrograma, datos).done(function(data) {
                    if (data.mensaje === "Correcto") {
                        alertify.success("Se actualizó correctamente la informacion");
                    } else {
                        alertify.success("No se ha podido registrar la informacion");
                    }
                });
                limpiamodals();
                $('#myModal').modal('hide');
            }
        }
    });

    $('#idProgramaAcademico').change(function(e) {
        var idProgramaAcademico = $(this).val();
        $.getJSON(contex + '/numeroNivel', {
            idProgramaAcademico: idProgramaAcademico
        }).done(function(data) {
            var cont = 0;
            $('#nivelColocacion').find('option').remove();
            $.each(data.numero, function(posicion, nive) {

                if (nive === null || nive.division === "0") {
                    var opcion = $('<option value=000>Sin nivel</option>');
                    $('#nivelColocacion').append(opcion);
                    $('#nivelColocacion').attr("disabled", "disabled");
                } else {
                    $('#nivelColocacion').removeAttr("disabled", "disabled");
                    for (var i = 0; i < nive.division; i++) {
                        cont = cont + 1;
                        var numero = numeroRomano(cont);
                        var opcion = $('<option value=' + cont + '>Nivel ' + numero + '</option>');
                        $('#nivelColocacion').append(opcion);
                    }

                }
            });
        });
    });

    $("#cancelarColocacion").on('click', function(e) {
        e.preventDefault();
        if ($("#idProgramaAcademico").val() === "0" && $("#nivelColocacion").val() === "0" && $("#comentarioColocacion").val() === "") {
            $('#myModal').modal('hide');
            limpiamodals();
            repite(contex);
        } else {
            alertify.set({buttonReverse: false, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de salir, no se guardarán cambios?", function(e) {
                if (e) {
                    $('#myModal').modal('hide');
                    limpiamodals();
                    repite(contex);

                }
                else {
                    $('#myModal').modal('show');
                }
            });
        }
    }
    );

    $("#comentarioColocacion").val("");


    $('#reporte').click(function(e) {

//        e.preventDefault();
        var validacion = $('#form3').validate({
            rules: {
                idPeriodo: {required: true, min: 1},
                idAreaAcademica: {required: true, min: 1}
            }, messages: {
                idPeriodo: "Este campo es requerido.",
                idAreaAcademica: "Este campo es requerido."
            }
        });
        var filas = $("#tablaSelecionAspirantes tbody td").length;
        if (validacion.form() && filas > 1) {
            $("#ipPeriodoReporte").val($("#idPeriodo").val());
            $("#idAreaAcademicaReporte").val($("#idAreaAcademica").val());
            $("#reporteLita").attr("action", context + "/reporteCandidatos", "Reporte");
            $("#reporteLita").attr("target", "_blank");
            $("#reporteLita").submit();
        } else {
            alertify.error("No existen datos suficientes para generar su lista");
        }
    });
}

function createTable(list, lista2) {
    var comentario = "";
    var option = "";
    var cont = 0;
    var textoBoton = "Guardar";
    if (list.length > 0) {
        $('#reporte').removeAttr("disabled", "disabled");
    } else {
        $('#reporte').attr("disabled", "disabled");
    }

    var t = $('#tablaSelecionAspirantes').DataTable();
    t.row("tr").remove().draw(false);
    for (var i = 0; i < list.length; i++) {

        for (var a = 0; a < lista2.length; a++) {
            if (list[i].idSolicitudIngreso === lista2[a].idColocacion) {
                textoBoton = "Modificar";
                a = lista2.length;
            } else {
                textoBoton = "Guardar";
            }
        }

        if (list[i].comentario === null) {
            comentario = "";
        } else {
            comentario = list[i].comentario;
        }

        if (list[i].estado === "pendiente") {
            option = "<option value=\"\" >Seleccione...</option>\n\
        <option value=\"rechazado\">Rechazado</option>\n\
            <option value=\"aceptado\">Aceptado</option>";
        }

        else if (list[i].estado === "aceptado") {
            option = "<option value=\"" + list[i].estado + "\">" + list[i].estado + "</option>\n\
                <option value=\"rechazado\">Rechazado</option>";
        }

        else {
            option = "<option value=\"" + list[i].estado + "\">" + list[i].estado + "</option>\n\
            <option value=\"aceptado\">Aceptado</option>";
        }

        cont = cont + 1;
        t.row.add([
            cont,
            list[i].nombre + " " + list[i].APaterno + " " + list[i].AMaterno,
            "<center><textarea class=\"form-control\" style=\"resize: none\" id=\"t" + list[i].idSolicitudIngreso + "\">" + comentario + "</textarea></center>",
            "<center>" + list[i].nombreEspecialidad + "</center>",
            "<center><select name=s" + list[i].idSolicitudIngreso + " id=s" + list[i].idSolicitudIngreso + " class=\"form-control\">" + option + "</center>",
            "<center><a href=\"#\" class=\"modificar\" data-idalumno=" + list[i].idAlumno + " data-id=" + list[i].idSolicitudIngreso + "> <input id=\"b" + list[i].idSolicitudIngreso + "\" type=\"button\" class=\"btn btn-info center\" value=\"" + textoBoton + "\"></a></center>"
        ]).draw();
    }
}

function limpiamodals() {
    $('#idProgramaAcademico').find('option').remove();
    var selecciones = $('<option value="0">Seleccione...</option>');
    $('#idProgramaAcademico').append(selecciones);
    $('#nivelColocacion').find('option').remove();
    var selecciones = $('<option value="0">Seleccione...</option>');
    $('#nivelColocacion').append(selecciones);
    $("#comentarioColocacion").val("");
}

function numeroRomano(n) {
    var
            values = [1, 5, 10, 50, 100, 500, 1000],
            letras = ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
            res = [],
            num, letra, val, pos, insert;
    for (var i = 6; num = values[i], letra = letras[i]; i--) {
        if (n >= num) {
            var r = Math.floor(n / num);
            n -= r * num;
            if (r < 4) {
                while (r--) {
                    res.push(letra);
                }
            } else {
                val = res.pop();
                pos = (val ? letras.indexOf(val) : i) + 1;
                insert = letra + (letras[pos] || 'M');
                res.push(insert);
            }
        } else {
            res.push('');
        }
    }
    return res.join('');
}

function repite(contex) {
    var idAreaAcademica = $("#idAreaAcademica").val();
    var idPeriodo = $("#idPeriodo").val();
    $(".modificar").attr("disabled", "disabled");
    $.getJSON(contex + '/consultaAspirantes', {
        idAreaAcademica: idAreaAcademica, idPeriodo: idPeriodo
    }).done(function(data) {
        createTable(data.listaCandidatos, data.cuentasColocacion);
        $(".modificar").removeAttr("disabled", "disabled");
    });
}