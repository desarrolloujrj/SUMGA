/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function inicio(contex) {
    
    var context = contex;
    
    $('#idPeriodoTipoE').change(function(e){
        
        var seleccionTipo = $('#seleccionTipoE').val();
        
        if(seleccionTipo == 1){
                        
            $('#form7').attr('action', context + "/consultarHorarioEspecialidad");
            $('#form7').submit();
            
        }else if(seleccionTipo == 2){
            
            $('#form7').attr('action', context + "/consultarHorarioIdioma");
            $('#form7').submit();
            
        }else if(seleccionTipo == 3){
            
            $('#form7').attr('action', context + "/consultarHorarioOptativa");
            $('#form7').submit();
            
        }
        
    });
    
}

