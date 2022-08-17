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
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Login</title>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
            <link rel="stylesheet" href="<c:url value=" /css/login_page.css" /> ">
            <script type="text/javascript" defer src="<c:url value='/js/themeController.js' />"></script>
          </head>

          <body>
            <div id="mainContainer">
              <div class="btn1div">
                <input type="checkbox" id="themeToggle" name="btnToggle">
              </div>
              <div class="row1">
                <img src="https://portfolio-avis-s3.s3.amazonaws.com/app/icons/logo.svg" alt="logo">
              </div>
              <div class="row2">
                <!-- form  -->
                <form:form action="/logging" method="post" modelAttribute="loginUser">
                  <div>
                    <form:input class="input" autofocus="autofocus" path="email" placeHolder="email" />
                  </div>
                  <div>
                    <form:input type="password" class="input" path="password" placeHolder="password" />
                  </div>
                  <form:errors class="errors" path="email" />
                  <form:errors class="errors" path="password" />
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