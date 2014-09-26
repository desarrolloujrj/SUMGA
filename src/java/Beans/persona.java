/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Beans;

/**
 *
 * @author Jonnathan
 */
public class persona {
    
    private int idPersona;
    private int idUsuario;
    private String nombrePersona;
    private String apellidoPersona;
    private String apellidoMaterno;
    private String direccion;
    private String correo;
    private String contrasena;
    private String tipoUsuario;

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombrePersona() {
        return nombrePersona;
    }

    public void setNombrePersona(String nombrePersona) {
        this.nombrePersona = nombrePersona;
    }

    public String getApellidoPersona() {
        return apellidoPersona;
    }

    public void setApellidoPersona(String apellidoPersona) {
        this.apellidoPersona = apellidoPersona;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public persona(int idPersona, int idUsuario, String nombrePersona, String apellidoPersona, String apellidoMaterno, String direccion, String correo, String contrasena, String tipoUsuario) {
        this.idPersona = idPersona;
        this.idUsuario = idUsuario;
        this.nombrePersona = nombrePersona;
        this.apellidoPersona = apellidoPersona;
        this.apellidoMaterno = apellidoMaterno;
        this.direccion = direccion;
        this.correo = correo;
        this.contrasena = contrasena;
        this.tipoUsuario = tipoUsuario;
    }

    public persona(String correo, String contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }

    public persona() {
    }
    
}