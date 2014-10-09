<%-- 
    Document   : Segunda Pagina
    Created on : 8/10/2014, 10:37:25 PM
    Author     : UrielJonnathan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="Beans.usuario"%>
<% String context = request.getContextPath();%>
<%if (request.getSession().getAttribute("usuario") != null) {%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
<%}else{
    response.sendRedirect(context);
}%>
