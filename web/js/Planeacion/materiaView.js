/* 
    Document   : materiaView.js
    Created on : 05-jul-2014, 14:06:36
    Author     : Alan Axel Caspeta Gomez.
 */

function iniciar(contex) {
    var context = contex;
    $('#modificarMaterias').find('input, button, select').attr("disabled", "disabled");

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#RegistraAccion').validate({
            rules: {
                nombreMateria: {required: true, maxlength: 200},
                semestre: {required: true, min: 1},
                clave: {required: true, maxlength: 200},
                seriacion: {required: true, maxlength: 2},
                horasSemanales: {required: true, maxlength: 2},
                creditos: {required: true, maxlength: 3},
                nivel: {required: true, maxlength: 2},
                idProgramaAcademico: {required: true, min: 1}
                
                
            }, messages: {
                nombreMateria: {
                    required: "Es necesario introducir el nombre de la Materia",
                    maxlength: "No puede introducir mas de 200 letras"
                },
                semestre: {
                    min: "Es necesario seleccionar un Numero de Semestre"
                },
                clave: {
                    required: "Es necesario introducir una Clave para la Materia",
                    maxlength: "No puede introducir mas de 200 caracteres"
                },
                seriacion: {
                    required: "Es necesario introducir El numero de Seriacion para la Materia",
                    maxlength: "No puede introducir mas de 2 caracteres"
                },
                horasSemanales: {
                    required: "Es necesario introducir un numero de Horas para la Materia",
                    maxlength: "No puede introducir mas de 2 caracteres"
                },
                creditos: {
                    required: "Es necesario introducir una numero de Creditos para la Materia",
                    maxlength: "No puede introducir mas de 3 caracteres"
                },
                nivel: {
                    required: "Es necesario introducir un numero de Nivel para la Materia",
                    maxlength: "No puede introducir mas de 2 caracteres"
                },
                idProgramaAcademico: {
                    min: "Es necesario seleccionar un Programa Academico para la Materia"
                }
            }
        });
        if (validacion.form()) {
            $('#RegistraAccion').submit();
        }
    });

    $('#ModificarAccion').click(function(e) {
        e.preventDefault();

        var validacion = $('#modificarMaterias').validate({
            rules: {
                nombreMateria: {required: true, maxlength: 200},
                semestre: {required: true, min: 1},
                clave: {required: true, maxlength: 200},
                seriacion: {required: true, maxlength: 2},
                horasSemanales: {required: true, maxlength: 2},
                creditos: {required: true, maxlength: 3},
                nivel: {required: true, maxlength: 2},
                idProgramaAcademico: {required: true, min: 1}
                
               
            }, messages: {
                nombreMateria: {
                    required: "Es necesario introducir el nombre de la Materia",
                    maxlength: "No puede introducir mas de 200 letras"
                },
                semestre: {
                    min: "Es necesario seleccionar un Numero de Semestre"
                },
                clave: {
                    required: "Es necesario introducir una Clave para la Materia",
                    maxlength: "No puede introducir mas de 200 caracteres"
                },
                seriacion: {
                    required: "Es necesario introducir El numero de Seriacion para la Materia",
                    maxlength: "No puede introducir mas de 2 caracteres"
                },
                horasSemanales: {
                    required: "Es necesario introducir un numero de Horas para la Materia",
                    maxlength: "No puede introducir mas de 2 caracteres"
                },
                creditos: {
                    required: "Es necesario introducir una numero de Creditos para la Materia",
                    maxlength: "No puede introducir mas de 3 caracteres"
                },
                nivel: {
                    required: "Es necesario introducir un numero de Nivel para la Materia",
                    maxlength: "No puede introducir mas de 2 caracteres"
                },
                idProgramaAcademico: {
                    min: "Es necesario seleccionar un Programa Academico para la Materia"
                }
            }
        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Esta seguro de que desea modificar el los datos de la Materia?", function(e) {
                if (e) {
                    $('#modificarMaterias').submit();
                } else {
                    alertify.error("No se realizo ninguna acción");
                }
            });
            return false;
        }
    });


    $(document).ready(function() {

        $('#tableMaterias').dataTable();
        $("#RegistraAccion").click(
                function(e) {
                    $('#status').val($('#statusCheck').is(':checked'));
                    $('#registrarMaterias').attr('action', "<%=context%>/registrarMateria");
                    $('#registrarMateria').submit();

                });

        $('#tableMaterias tbody').on('click', 'td .modificar', function(e) {
            $('#modificarMaterias').find('input, button, select').removeAttr("disabled");
            e.preventDefault();
            var op = $(this).data("optativa");
            var esp = $(this).data("especialidad");


            $("#idMateriaA").val($(this).data("idmateria"));
            $("#nombreMateriaA").val($(this).data("nombremateria"));
            $("#semestreA option[value=" + $(this).data("semestre") + "]").attr('selected', 'selected');
            $("#claveA").val($(this).data("clave"));
            $("#seriacionA").val($(this).data("seriacion"));
            $("#horasSemanalesA").val($(this).data("horassemanales"));
            $("#creditosA").val($(this).data("creditos"));
            $("#nivelA").val($(this).data("nivel"));
            $("input:radio[id=tipoA]", "#modificarMaterias").filter("[value=" + $(this).data("tipo") + "]").prop("checked", true);

            if (op == 0 && esp == 0) {
                $("#tipoMateriaA option[value=0]").attr('selected', 'selected');
            } else if (op == 1 && esp == 0) {
                $("#tipoMateriaA option[value=1]").attr('selected', 'selected');
            } else if (op == 0 && esp == 1) {
                $("#tipoMateriaA option[value=2]").attr('selected', 'selected');
            }

            $("input:radio[id=statusA]", "#modificarMaterias").filter("[value=" + $(this).data("status") + "]").prop("checked", true);
            $("#prAcademicoA option[value=" + $(this).data("programaacademico") + "]").attr('selected', 'selected');


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

    $(".eliminar").click(
        function(e) {
            e.preventDefault();

            $('#idPlanEstudio').val($(this).data("id"));
            $('#form1').attr('action', "<%=context%>/eliminarMateria");
            $('#form1').submit();
        });
    });


 $("#Cancelar").click(function(e) {
        $('#modificarT').removeClass('active');
        $('#modificar').removeClass('active');
        $('#registrar').removeClass('active');
        $('#registrarT').removeClass('active');
        $('#mostrarT').addClass('active');
        $('#mostrar').addClass('active');
        $('#mostrar').addClass('in');

        $('#modificarMaterias').find('input, button, select').val('');
        $('#modificarMaterias').find('input, button, select').attr("disabled", "disabled");
    });

}