/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Controller;

import Beans.persona;
import com.opensymphony.xwork2.ActionSupport;

/**
 *
 * @author Jonnathan
 */
public class login extends ActionSupport{
    
    private String usuario;
    private String contrasena;
    private persona persona;
    
    public String login(){
        
        return SUCCESS;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    
}
