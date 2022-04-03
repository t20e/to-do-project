<%@page import="javax.swing.text.View"%>
<%@page import="com.avis.todo.models.DbCategory"%>
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
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/css/home_page.css">
<meta charset="UTF-8">
<title>to do</title>
<script type="text/javascript" src="<c:url value='/js/themeController.js' />"></script>
</head>
<body>
  <div id="mainContainer">
    <div class="btn1div">
      <!-- button one -->
      <input type="checkbox" id="themeToggle" name="btnToggle">
    </div>
    <!-- **** -->
    <div class="columnContainer">
      <div class="columnLeft">
        <div class="row1">
          <div class="calenderContainer"></div>
          <!-- calender -->
        </div>
        <div class="row2">
          <!-- selected category  -->
          <div class="selectedCategoryContainer">


<!-- first if  -->
      <c:if test="${not empty categoryToShow}">
          <div class="selectedCategoryName">
            <div>
              <h2>${ categoryToShow.name } </h2>
            </div>
            <div>
              <img src="/images/plus_sign.svg" alt="add task" id="addTaskPlusSign">
            </div>
          </div>
          <div class="tasksList">
            <c:forEach items='${ categoryToShow.tasks }' var='task'>
              <div class="checkBoxContainer">
                <div class="repeatCheckbox">
                      <label class="checkBoxLabel">
                        <input type="checkbox" path="${task.id}" id="${task.name}" >
                        <span class="checkmark"></span>
                      </label>
                      <p>${task.name}</p>
                </div>
              </div>
            </c:forEach>
          </div>
      </c:if>

<!-- second if  -->
      <c:if test="${empty categoryToShow}">
            <div class="selectedCategoryName">
              <H2>All Tasks</H2>
            </div>
            <div class="tasksList">
              <c:forEach items='${ user.tasks }' var='task'>
                <div class="checkBoxContainer">
                  <div class="repeatCheckbox">
                        <label class="checkBoxLabel">
                          <input type="checkbox" path="${task.id}" id="${task.name}" >
                          <span class="checkmark"></span>
                        </label>
                        <p class="taskParagraph">${task.name}</p>
                  </div>
                </div>
              </c:forEach>
            </div>
      </c:if>




      </div>
        </div>
      </div>
      <div class="columnRight">
        <div class="dashboard">
          <!-- shows user info and all categories in order by priotity -->
            <div class="rowDashNav">
              <img src="/images/logo.svg" alt="">
              <h3> ${ user.firstName } </h3>
            </div>
            <div class="rowRepeatContainer">
                <a class="rowRepeat" href="/category/alltasks/${loggedInUserId}">All Tasks</a>
                <c:forEach items='${ user.categories }' var='category'>
                  <div class="rowRepeat"><a href="/category/${category.id}">${category.name}</a></div>
                
                </c:forEach>
              
              <div class="addCategory">
                <img src="/images/plus_sign.svg" id="addCategory" alt="plus sign">
                <!--  if category contains more then 15 categories then display a pull down that will show all categories-->
              </div>
            </div>
        </div>
      </div>
    </div>

  </div>
  <div id="addCategoryPopup">
    <div class="popUpContent">
      <!-- content -->
      <h2>Add Category</h2>

        <form:form action="/category/add" method="post" modelAttribute="categoryForm">
          <form:input type="hidden" path="user" value=" ${loggedInUserId} "/>
          <div>
            <form:errors path="name" />
            <form:input class="input" autofocus="autofocus" path="name" placeHolder="name" />
          </div>
          <div>
            <form:errors path="priority" />
            <form:input class="input" path="priority" placeHolder="priority"/>
          </div>
          <input id="btn" type="submit" value="Add" />
        </form:form>    
    </div>
  </div>
  <!-- add task pop up **************-->
  <div id="addTaskPopup">
    <div class="taskPopUpContent">
      <!-- content -->
      <h2>Add task</h2>
      <form:form action="/task/add" method="post" modelAttribute="taskForm">
        <form:input type="hidden" path="category" value=" ${categoryToShow.id} "/>
        <form:input type="hidden" path="user" value=" ${user.id} "/>
        
        <div>
          <form:errors path="name" />
          <form:input class="input"  autofocus="autofocus" path="name" placeHolder="name" />
        </div>
        <!-- //radio for input priority -->
        <div id="radioHolder">
            <div class="radioContainer">
              <form:errors path="priority" />

              <form:radiobutton class="dueRadio_input" path="priority" name="dueRadio" value="1" id="1"/>
              <label class="dueRadio_label" for="1">due now</label>
              <form:radiobutton class="dueRadio_input" path="priority" name="dueRadio" value="2" id="2"/>
              <label class="dueRadio_label" for="2">due soon</label>
              <form:radiobutton class="dueRadio_input" path="priority" name="dueRadio" value="3" id="3"/>
              <label class="dueRadio_label" for="3">due later</label>


            </div>
          </div>
        <div>
          <form:errors path="due" />
          <form:input type="date" class="input" path="due" placeHolder="due"/>
        </div>

        <div>
          <form:errors path="location" />
          <form:input class="input" path="location" placeHolder="location"/>
        </div>
        <div>
          <form:errors path="notes" />
          <form:input class="input" path="notes" placeHolder="notes"/>
        </div>
        <input id="btn" type="submit" value="Add" />
      </form:form>   
  
    </div>
  </div>
  <footer>
    <p> &copy to-do-app </p>
  </footer>
  <script type="text/javascript" src="<c:url value='/js//popUpController.js' />"></script>
</body>
</html>