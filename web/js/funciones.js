/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function onLoad() {
    $(".navbar-left").hide();
}

function mostar() {
    $("#submenu").show();

}

function prueba(){
//$(function() {
    /*CARGA DE CONTENEDORES DEL MENU PRINCIPAL*/
//    $("#planeacion").click(function() {
        alert('kgkgk') ;
        $(location).attr('href', '../Planeacion/PanelControlPlaneacion.jsp');
        $("#submenu").show();
//        $('#submenu').load("../jsp/Planeacion/PanelControlPlaneacion.jsp");
//    });
//});
}