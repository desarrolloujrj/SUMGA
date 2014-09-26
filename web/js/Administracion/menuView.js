/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * @document NotificacionView
 * @author Uriel Jonnathan Ramirez Juarez
 * @versión 04/08/2014
 */

function process(context) {
    $('#tablanotificacion').dataTable();
    var idUsuario = $("#idUsuario").val();
    $("#menuNotificacionUsuario").click(function(e) {
        $.getJSON(context + '/consultaNotificaciones', {
            idUsuario: idUsuario
        }).done(function(data) {
            $.each(data.listanotificacion, function(posicion, notificacion) {
                $('#notificacionCuenta').find('a').remove();
                $('#notificacionCuenta').find('span').remove();
                var estilo = "class=\"fa fa-foursquare icon-animated-vertical\"";
                for (var a = 0; a < data.listanotificacion.length; a++) {
                    if (data.listanotificacion[a].status === true) {
                        estilo = "class=\"fa fa-envelope icon-animated-vertical\"";
                    } else if (data.listanotificacion[a].status === false) {
                        estilo = "class=\"fa fa-foursquare\"";
                    }
                    $('#notificacionCuenta').append('<a href="#"'
                            + 'id="n' + data.listanotificacion[a].idNotificacionAlumno + '" data-idnotificacion="' + data.listanotificacion[a].idNotificacionAlumno + '"'
                            + 'data-asunto="' + data.listanotificacion[a].asunto + '" data-descripcion="' + data.listanotificacion[a].descripcion + '" data-idCuenta="' + data.listanotificacion[a].idCuenta + '"'
                            + 'data-status="' + data.listanotificacion[a].status + '" data-fecha="' + data.listanotificacion[a].fecha + '"'
                            + 'onclick="vernotificacion(' + data.listanotificacion[a].idNotificacionAlumno + ',\'' + context + '\');">'
                            + '<div class="media-body">'
                            + '<strong><i ' + estilo + '></i>  ' + data.listanotificacion[a].asunto + '</strong>'
                            + '<p class="small text-muted" style=\"float: right;\"><i class="fa fa-clock-o"></i> ' + data.listanotificacion[a].fecha + '</p>'
                            + '</div>'
                            + '<li role="presentation" class="divider"></li></a>');
                }
            });
        });
    });

    $("#todasnoti").click(function(e) {
        e.preventDefault();
        $("#vertodonoti").submit();
    });
}
function vernotificacion(idNotificacion, context) {
    $.post(context + '/checkNotificacion', {
        idNotificacion: idNotificacion
    }, function(data) {
        var estilo = "class=\"fa fa-foursquare icon-animated-vertical\"";
        var asunto = $("#n" + idNotificacion).data("asunto");
        var descripcion = $("#n" + idNotificacion).data("descripcion");
        var status = $("#n" + idNotificacion).data("status");
        var fecha = $("#n" + idNotificacion).data("fecha");

        if (status === true) {
            estilo = "class=\"ace-icon fa fa-envelope icon-animated-vertical\"";
        } else if (status === false) {
            estilo = "class=\"fa fa-foursquare icon-animated-vertical\"";
        }

        alertify.alert(
                "<h4 class=\"modal-title\"><i " + estilo + "></i>  " + asunto + "</h4>"
                + "**********************************************************"
                + "*     <p>" + descripcion + "</p>*"
                + "**********************************************************"
                + "    Fecha de envio " + fecha);

    }, "json");
}

function verifica(context) {
    var idUsuario = $("#idUsuario").val();
    $.post(context + '/numeroNotificacion',
            {idUsuario: idUsuario},
    function(data) {
        if (data.numeroNotificacion === 0) {
            $('#numeroCirculo').find('span').remove();
            $('#numeroCirculo').removeClass("count")
        } else {
            $('#numeroCirculo').find('span').remove();
            $('#numeroCirculo').append('<span id="num" class="count">' + data.numeroNotificacion + '</span>');
        }
    }, "json");

    setTimeout(function() {
        verifica(context);
    }, 3000);
}