<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

  <!-- c:out ; c:forEach ; c:if -->
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <!-- Formatting (like dates) -->
    <%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
      <!-- form:form -->
      <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
        <!-- for rendering errors on PUT routes -->
        <%@ page isErrorPage="true" %>
          <!DOCTYPE html>
          <html>

          <head>
            <meta charset="UTF-8">
            <title>Register</title>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
            <link rel="stylesheet" href="<c:url value=" /css/register_page.css" /> ">
            <script type="text/javascript" defer src="<c:url value='/js/themeController.js' />"></script>
          </head>

          <body>
            <div id="mainContainer">
              <div class="btn1div">
                <input type="checkbox" id="themeToggle" name="btnToggle">
              </div>
              <div class="row1">
                <img src="/images/logo.svg" alt="logo">
              </div>
              <div class="row2">
                <!-- form  -->
                <form:form action="/registering" method="post" modelAttribute="newUser">
                  <div>
                    <form:input class="input" autofocus="autofocus" path="firstName" placeHolder="first Name" />
                  </div>
                  <form:errors class="errors" path="firstName" />
                  <div>
                    <form:input class="input" path="lastName" placeHolder="last Name" />
                  </div>
                  <form:errors class="errors" path="lastName" />
                  <div class="ageContainer">
                    <form:label class="ageLabel" path="age">age</form:label>
                    <form:input class="inputAge" type="number" path="age" />
                  </div>
                  <form:errors class="errors" path="age" />
                  <div>
                    <form:input class="input" path="email" placeHolder="email" />
                  </div>
                  <form:errors class="errors" path="email" />
                  <div>
                    <form:input type="password" class="input" path="password" placeHolder="password" />
                  </div>
                  <form:errors class="errors" path="password" />
                  <div>
                    <form:input type="password" class="input" path="confirmPassword" placeHolder="confirm password" />
                  </div>
                  <form:errors class="errors" path="confirmPassword" />
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