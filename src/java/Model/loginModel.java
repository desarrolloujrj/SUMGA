/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import Beans.usuario;
import Utelerias.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Jonnathan
 */
public class loginModel {

    private boolean status = false;
    private Connection conexion = null;
    private usuario usuario = null;
    private String consulta = null;
    private PreparedStatement ps = null;
    private ResultSet rs=null;

    public usuario logueo(String correo, String contrasena) {
        try {
            conexion = Conexion.getConnection();
            consulta = "SELECT p.*,u.idUsuario,u.correo,u.contrasena,u.usuario,u.tipoUsuario \n"
                    + "FROM persona AS p INNER JOIN usuario AS u ON u.idPersona=p.idPersona\n"
                    + "WHERE u.correo=? AND u.contrasena=?;";
            ps = conexion.prepareStatement(consulta);
            ps.setString(1, correo);
            ps.setString(2, contrasena);
            rs=ps.executeQuery();
            while(rs.next()){
                usuario=new usuario();
                usuario.setIdPersona(rs.getInt("idPersona"));
                usuario.setIdUsuario(rs.getInt("idUsuario"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setApellidos(rs.getString("apellidos"));
                usuario.setDireccion(rs.getString("direccion"));
                usuario.setCorreo(rs.getString("correo"));
                usuario.setContrasena(rs.getString("contrasena"));
                usuario.setUsuario(rs.getString("usuario"));
                usuario.setTipoUsuario(rs.getString("tipoUsuario"));
            }
        } catch (SQLException e) {
            System.out.println("Login - logueo: "+e.getMessage());
        }
        return usuario;
    }
}
