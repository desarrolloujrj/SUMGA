/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//mostrar los campos dependiendo de l pito de beca seleccionada


//function inicio(contex) {
//
//    var c = contex;
//
//    $('#tableBecas').dataTable();
////        $("#RegistraAccion").click(
////                function(e) {
////                    $('#status').val($('#statusCheck').is(':checked'));
////                    $('#registrarMaterias').attr('action', "<%=context%>/registrarMateria");
////                    $('#registrarMateria').submit();
////
////                });
//
//    $('#tableBecas tbody').on('click', 'td .modificar', function(e) {
//        $('#modificarMaterias').find('input, button, select').removeAttr("disabled");
//        e.preventDefault();
//        var op = $(this).data("optativa");
//        var esp = $(this).data("especialidad");
//
//
//    });
//
//    $(".eliminar").click(
//            function(e) {
//                e.preventDefault();
//
//                $('#idPlanEstudio').val($(this).data("id"));
//                $('#form1').attr('action', "<%=context%>/eliminarMateria");
//                $('#form1').submit();
//            });
//
//
//
//    $("#listaBeca").change(function() {
//
//        var noSemestre = $("#listaBeca").val();
//
//        if (noSemestre == "1") {
//            $("#becaAcademica").show();
//        }
//
//    });
//
//

//
//
//
//}

function inicio(context) {
    var c = context;
    
    $('#tableBecas').dataTable();

    $("#RegistraAccion").click(function(e) {
        e.preventDefault();
        var validacion = $('#form1').validate({
            rules: {
                
                idBeca: {required: true, min: 1},
                idPeriodo: {required: true, min: 1},
                tramiteBeca: {required: true, min: 1},
                fechaInicio: {required: true, maxlength: 11},
            }
        });
        if (validacion.form()) {
            generarReporte();
        }
    });
     
    function generarReporte(){
   
        var datos = $("#form1").serialize();

        $.getJSON(c + '/registrarSolicitudBeca', datos).done(function(data) {
            if (data.mensaje2 == "correcto") {
                if ($("#listaBeca").val() == 1) {
                    window.open(context + '/generarSolicitudBecaAcademica','Reporte', '_blank');
                } else if ($("#listaBeca").val() == 2) {
                    window.open(context + '/generarSolicitudBecaSocioEconomica',"Reporte", '_blank');
                } else if ($("#listaBeca").val() == 3) {
                    window.open(context + '/generarSolicitudBecaPersonalAdministrativo',"Reporte", '_blank');
                } else if ($("#listaBeca").val() == 4) {
                    window.open(context + '/generarSolicitudBecaGruposRepresentativos',"Reporte", '_blank');
                } else if ($("#listaBeca").val() == 5) {
                    window.open(context + '/generarSolicitudBecaProyeccionArtistica',"Reporte", '_blank');
                }
            } else {

            }
        });
}
    //se le asigna la fecha inicial el datepicker
    $("#fechaInicio").datetimepicker({
        language: "es",
        format: "dd/mm/yyyy",
        minView: 2
    });
}

