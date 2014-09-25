/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Utelerias;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

/**
 *
 * @author Jonnathan
 */
public class Conexion {
    
    private static String ipAddress;
    private static String dbName;
    private static String user;
    private static String password;
    private static String service;
    private static ResourceBundle propiedadesBD;

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("Conexion: "+e.getMessage());
        }

        if (propiedadesBD == null) {
            propiedadesBD = ResourceBundle.getBundle("propiedadesBD");
            ipAddress = propiedadesBD.getString("ipAddress");
            dbName = propiedadesBD.getString("dbName");
            user = propiedadesBD.getString("user");
            password = propiedadesBD.getString("password");
            service = propiedadesBD.getString("service");
        }

        return DriverManager.getConnection("jdbc:mysql://" + ipAddress + ":" + service + "/" + dbName, user, password);
    }
    
    
    public static void main(String[] args) {
        try {
            Connection con = getConnection();
            System.out.println("(^_^) Connection successful ... ");
            con.close();
        } catch (SQLException e) {
            System.out.println("(o_O) Conection error ... " + e);
        }
    }
}
