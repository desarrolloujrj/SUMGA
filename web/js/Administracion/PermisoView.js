


function iniciar(contex) {
    var context = contex;
    $('#idDepartamento').unbind();
    $('#optgroup').unbind();
    $('#tablaPermisos').unbind();
    $('#formModificar').unbind();
    $('#botonRegistrar').unbind();
    $('#botonModificar').unbind();
    $('#botonCancelarModificar').unbind();
    $('#tablaPermisos tbody').unbind();
    $('#idRol').unbind();
    $('#guardarAsignacion').unbind();


    $('#guardarAsignacion').click(function(e) {
        e.preventDefault();
        $('#formAsignacion').attr('action', context + "/guardarAsignacionPermisos");
        $('#formAsignacion').submit();
    });

    $('#idDepartamento').change(function(e) {
        var idDepartamento = $(this).val();

        $.getJSON(context + '/consultarRolesDepartamento', {
            idDepartamento: idDepartamento
        }).done(function(data) {

            $('#idRol').find('option').remove();
            $('#idRol').append($('<option value="" >Seleccione...</option>'));
            $.each(data.roles, function(posicion, rol) {

                var opcion = $('<option value="' + rol.idRol + '">' + rol.nombreRol + '</option>')
                $('#idRol').append(opcion);
                });
            iniciar(context);
        });
    });

    $('#idRol').change(function(e) {
        var idRol = $(this).val();
        $.getJSON(context + '/consultarPermisosAsignadosRol', {
            idRol: idRol
        }).done(function(data) {

            $('#asignacion').empty();

            $.each(data.subModulos, function(con, subM) {
                var optgroup = $('<optgroup>');
                optgroup.attr('label', subM.modulo + ' - ' + subM.subModulo);

                $.each(subM.permisos, function(p, permiso) {
                    var option = $("<option></option>");
                    option.val(permiso.idPermiso + '/' + permiso.idAsignacion);
                    if (permiso.idAsignacion !== 0) {
                        option.attr("selected", true);
                    }
                    option.text(permiso.nombrePermiso);
                    optgroup.append(option);


                });
                $("#asignacion").append(optgroup);


                });
            $('#asignacion').multiSelect('refresh');
            iniciar(context);
        });
    });

    $('#asignacion').multiSelect({
        selectableOptgroup: true,
        selectableHeader: "<div class='custom-header'>Permisos no asignados</div>",
        selectionHeader: "<div class='custom-header'>Permisos asignados</div>",
    });
    $('#tablaPermisos').dataTable();
    $('#formModificar').find('input, textarea, button, select').attr("disabled", "disabled");


    $('#tablaPermisos tbody').on('click', 'td .modificar', function(e) {
//            $('.modificar').click(function(e) {

        e.preventDefault();
        $('#formModificar').find('input, textarea, button, select').removeAttr("disabled");
        $('#idPermisoM').val($(this).data("id"));
        $('#nombrePermisoM').val($(this).data("nombrepermiso"));
        $('#descripcionM').val($(this).data("descripcion"));

        $("#idSubModuloM").val($(this).data("idsubmodulo"));
        // ejecutamos el evento change()
        $("#idSubModuloM").change();

        $("#modificarT").children("a.titulosToggle").click();
//        //Oculto el el boton de registrar y activo el boton de modificar y cancelar
//        $("#mostrarT").removeClass('active');
//        $("#mostrarT").removeClass('in');
//        $("#mostrar").removeClass('active');
//
//
//        $("#registrar").removeClass('active');
//        $("#registrarT").removeClass('active');
//        $("#registrarT").removeClass('in');
//
//        $("#modificarT").addClass('active');
//        $("#modificar").addClass('in');
//        $("#modificar").addClass('active');

    });


    $('#botonRegistrar').click(function(e) {
        e.preventDefault();

        var validacion = $("#formRegistrar").validate({
            rules: {
                // simple rule, converted to {required:true}
                "permiso.nombrePermiso": {required: true},
                // compound rule
                "permiso.idSubModulo": {required: true}
                
            }


        });
        if (validacion.form()) {
//                console.log($('#idSubModulo').val());
            $("#formRegistrar").submit();


        }
    });

    $('#botonModificar').click(function(e) {
        e.preventDefault();

        var validacion = $("#formModificar").validate({
            rules: {
                // simple rule, converted to {required:true}
                idPermiso: {required: true, min: 1},
                nombrePermiso: {required: true},
                // compound rule

                idSubModulo: {required: true, min: 1}
            }


        });
        if (validacion.form()) {
            alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
            alertify.confirm("¿Estás seguro de modificar el permiso?", function(e) {
                if (e) {
                    $('#formModificar').attr('action', context + "/modificarPermiso");
                    $("#formModificar").submit();
                } else {
                    alertify.error("No se realizo ninguna acción");

                }
            });



        }
    });

    $('#botonCancelarModificar').click(
            function(e) {
                e.preventDefault();
                $('#modificarT').removeClass('active');
                $('#modificar').removeClass('active');
                $('#registrar').removeClass('active');
                $('#registrarT').removeClass('active');
                $('#mostrarT').addClass('active');
                $('#mostrar').addClass('active');
                $('#mostrar').addClass('in');
                $("#idSubModuloM").val(0);
                // ejecutamos el evento change()
                $("#idSubModuloM").change();
                $('#formModificar').find('input, textarea, button').val('')
                $('#formModificar').find('input, textarea, button, select').attr("disabled", "disabled");
            });

//            $(".eliminar").on('click',function(e) {
    $('#tablaPermisos tbody').on('click', 'td .eliminar', function(e) {
        e.preventDefault();
        var idPermiso = $(this).data("id");
        alertify.set({buttonReverse: true, labels: {ok: "Aceptar", cancel: "Cancelar"}});
        alertify.confirm("¿Estás seguro de eliminar el permiso?", function(e) {
            if (e) {
                $('#formModificar').find('input, textarea, button, select').removeAttr("disabled");
                $('#idPermisoM').val(idPermiso);
                $('#formModificar').attr('action', context + "/eliminarPermiso");
                $('#formModificar').submit();
            } else {
                alertify.error("No se realizo ninguna acción");
            }
        });
    });

}









        