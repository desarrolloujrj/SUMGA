/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Utelerias;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author UrielJonnathan
 */
public class validaCorreo {
    
    private static final String PATTERN_EMAIL = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    
    public boolean Correo(String email) {
        Pattern pattern = Pattern.compile(PATTERN_EMAIL);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
    
    public static void main(String[] args){
        validaCorreo Correo=new validaCorreo();
        System.out.println( Correo.Correo("jonat_angel@hotmail.com"));
        System.out.println( Correo.Correo("#$#@R#$R#@R@#$@#DWD"));
    }
}