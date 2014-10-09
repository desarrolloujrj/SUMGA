<%-- 
    Document   : index
    Created on : 24/09/2014, 06:46:22 PM
    Author     : Jonnathan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%@page import="Beans.usuario"%>
<% String context = request.getContextPath();%>
<%if(request.getSession().getAttribute("usuario") != null){%>
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
        <form id="form" name="form" action="metodo">
            <input type="submit" value="hola"/>        
        </form>
        <form id="form2" name="form2" action="logoutAccion">
            <input type="submit" value="salir"/>        
        </form>
    </body>
</html>
<%}else{
    response.sendRedirect(context);
}%>