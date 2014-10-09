<%-- 
    Document   : index
    Created on : 24/09/2014, 06:46:22 PM
    Author     : Jonnathan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%@page import="Beans.usuario"%>
<% String context = request.getContextPath();%>
<% if ((usuario) session.getAttribute("usuario") != null) {
        response.sendRedirect(context + "/JSP/index.jsp");
    }%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="<%=context%>/css/sb-admin.css" rel="stylesheet">
        <link rel="stylesheet" href="<%=context%>/css/lib/bootstrap.min.css">
        <link rel="stylesheet" href="<%=context%>/css/main.css">
        <title>Login</title>
    </head>
    <body>
        <div class="apollo">
            <div class="apollo-container clearfix">
                <div>
                    <div class="apollo-image"></div>
                </div>
                <div class="apollo-login">
                    <p class="apollo-seperator"> O </p>
                    <form name="login" class="form-signin" id="apollo-login-form" method="POST" action="login">
                        <div class="control-group">
                            <input type="text" value="" class="input-block-level" name="correo" placeholder="Usuario">
                        </div>
                        <div class="control-group">
                            <input type="password" value="" class="input-block-level" name="contrasena" placeholder="Contraseña">
                        </div>
                        <button class="btn btn-large btn-block btn-warning" type="submit">Iniciar Sesion</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>