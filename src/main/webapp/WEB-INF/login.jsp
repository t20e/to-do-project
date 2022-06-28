<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
   <!-- c:out ; c:forEach ; c:if -->
 <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
   <!-- Formatting (like dates) -->
 <%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
   <!-- form:form -->
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
   <!-- for rendering errors on PUT routes -->
 <%@ page isErrorPage="true" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
<link rel="stylesheet" href="/css/login_page.css">
</head>
<body>

  <div id="mainContainer">
    <div class="btn1div">
      <!-- button one -->
      <input type="checkbox" name="btnToggle">
  </div>
    <div class="row1">
      <img src="/images/logo.svg" alt="logo">
    </div>
    <div class="row2">
      <!-- form  -->
      <form:form action="/logging" method="post" modelAttribute="loginUser">
        <div>
          <form:errors path="email" />
          <form:input class="input" autofocus="autofocus" path="email" placeHolder="email" />
        </div>
        <div>
          <form:errors path="password" />
          <form:input type="password" class="input" path="password" placeHolder="password"/>
        </div>
        <input id="btn" type="submit" value="Login" />
      </form:form>
    </div>
    <div class="row3">
      <!-- link to register  -->
      <a href="/reg">sign up</a>
    </div>
  </div>
  <footer>
    <p>&copy to-do-app </p>
  </footer>
</body>
</html>