/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import Model.loginModel;
import Beans.usuario;
import com.opensymphony.xwork2.ActionSupport;
import java.util.Map;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;

/**
 *
 * @author Jonnathan
 */
public class login extends ActionSupport implements SessionAware {

    private String correo;
    private String contrasena;
    private String mensajeErrors;
    boolean correcto = false;
    private SessionMap<String, Object> sessionMap;
    usuario Usuaario = new usuario();

    @Override
    public void setSession(Map<String, Object> map) {
        sessionMap = (SessionMap) map;
    }

    @Override
    public void validate() {

        if (correo != null && contrasena != null) {
            if (correo.equals("") && contrasena.equals("")) {
                mensajeErrors = ("Ingresa tu usuario y password");
            } else if (correo.equals("")) {
                mensajeErrors = ("Ingresa tu usuario");
            } else if (contrasena.equals("")) {
                mensajeErrors = ("Ingresa tu password");
            } else {
                correcto = true;
            }
        } else {
            mensajeErrors = ("Ingresa tu usuario y password");
        }
    }

    @Override
    public String execute() {
        if (correcto) {
            loginModel login = new loginModel();
            Usuaario = login.logueo(correo, contrasena);
            if (Usuaario.getIdUsuario() != 0) {
                sessionMap.put("usuario", Usuaario);
                sessionMap.put("permisos", Usuaario);
                return "administrador";
            } else {
                mensajeErrors = ("Usuario y password incorrectos");
                return ERROR;
            }
        } else {
            return ERROR;
        }
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getMensajeErrors() {
        return mensajeErrors;
    }

    public void setMensajeErrors(String mensajeErrors) {
        this.mensajeErrors = mensajeErrors;
    }
}
