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
<title>Register</title>
<link rel="stylesheet" href="<c:url value="/css/register_page.css" /> ">
</head>
<body>

  <div id="mainContainer">
    <div class="btn1div">
      <!-- button one -->
      <input type="checkbox" >
  </div>
    <div class="row1">
      <img src="/images/logo.svg" alt="logo">
    </div>
    <div class="row2">
      <!-- form  -->
      <form:form action="/registering" method="post" modelAttribute="newUser">
        <div>
          <form:errors path="lastName" />
          <form:input class="input" autofocus="autofocus" path="firstName" placeHolder="first Name" />
        </div>
        <div>
          <form:errors path="lastName" />
          <form:input class="input" path="lastName" placeHolder="last Name" />
        </div>
        <div class="ageContainer">
          <form:label class="ageLabel" path="age">age</form:label>
          <form:errors path="age" />
          <form:input class="inputAge" type="number" path="age" />
        </div>
        <div>
                <form:errors path="email" />
          <form:input class="input" path="email" placeHolder="email" />
        </div>
        <div>
          <form:errors path="password" />
          <form:input type="password" class="input" path="password" placeHolder="password"/>
        </div>
        <div>
          <form:errors path="confirmPassword" />
          <form:input type="password" class="input" path="confirmPassword" placeHolder="confirm password"/>
        </div>
        <input id="btn" type="submit" value="Sign Up" />
      </form:form>
      
      
    </div>
    <div class="row3">
      <!-- link to register  -->
      <a href="/login">login</a>
    </div>
  </div>
  <footer>
    <p>&copy to-do-app </p>
  </footer>
</body>
</html>