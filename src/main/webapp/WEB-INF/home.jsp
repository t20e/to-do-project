<%@page import="javax.swing.text.View" %>
  <%@page import="com.avis.todo.models.DbCategory" %>
    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
      <!-- c:out ; c:forEach ; c:if -->
      <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <!-- Formatting (like dates) -->
        <%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
          <!-- form:form -->
          <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
            <!-- for rendering errors on PUT routes -->
            <%@ page isErrorPage="true" %>
              <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
                <!DOCTYPE html>
                <html>

                <head>
                  <meta charset="UTF-8">
                  <title>To Do App</title>
                  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
                  <!-- <script>
                    window.jQuery || document.write('<script src="{{url_for('static', filename='jquery.js') }}">\x3C/script>')
                      $SCRIPT_ROOT = {{ request.script_root | tojson }};
                      </script> -->
                  <script type="text/javascript" src="<c:url value='/js/themeController.js' />"></script>
                  <link rel="stylesheet" href="/css/home_page.css">
                  <link rel="stylesheet" href="/css/formPopupStyle.css">
                  <script type="text/javascript" src="<c:url value='/js//formSubmissionHandler.js' />"></script>
                </head>

                <body>
                  <div id="mainContainer">
                    <div class="btn1div">
                      <!-- button one -->
                      <input type="checkbox" id="themeToggle" name="btnToggle">
                    </div>
                    <div class="columnContainer">
                      <div class="columnLeft">
                        <div class="row1">
                          <div class="calenderContainer"></div>
                          <!-- calender -->
                        </div>
                        <div class="row2">
                          <!-- selected category  -->
                          <div class="selectedCategoryContainer">
                            <div class="selectedCategoryName">
                              <H2>All Tasks</H2>
                            </div>
                            <div>
                              <img src="/images/plus_sign.svg" id="addTaskPlusImg" alt="plus sign">
                            </div>
                            <div class="tasksList">
                              <c:forEach items='${ user.tasks }' var='task'>
                                <div class="checkBoxContainer">
                                  <div class="repeatCheckbox">
                                    <label class="checkBoxLabel">
                                      <input type="checkbox" path="${task.id}" id="${task.name}">
                                      <span class="checkmark"></span>
                                    </label>
                                    <p class="taskParagraph">${task.name}</p>
                                  </div>
                                </div>
                              </c:forEach>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="columnRight">
                        <div class="dashboard">
                          <!-- shows user info and all categories in order by priotity {always show all task as main}-->
                          <div class="rowDashNav">
                            <img src="/images/logo.svg" alt="">
                            <h3> hey, ${ user.firstName } </h3>
                            <div class="userActions">
                              <a href="/logout">logout</a>
                            </div>
                          </div>
                          <div class="rowRepeatContainer">
                            <!-- this will call jquery to get all tasks for user in all tasks table -->
                            <button class="retrieveDataBtn" onclick="getAllTasks()">
                              <div class="rowRepeat">
                                <p>All Tasks</p>
                              </div>
                            </button>
                            <c:forEach items='${ user.categories }' var='category'>
                              <button class="retrieveDataBtn" onclick="getTasksPerCat('${category.id}')">
                                <div class="rowRepeat">
                                  <p>${category.name}</p>
                                </div>
                                <script>
                                  allCategoriesInOrder.push({ "name": `${category.name}`, "id": `${category.id}`, "priority": `${category.priority}` })
                                </script>
                              </button>
                            </c:forEach>
                          </div>
                          <div class="addCategoryPlusImgDiv">
                            <img src="/images/plus_sign.svg" id="addCategoryPlusImg" alt="plus sign">
                            <!--  if category contains more then 15 categories then display a pull down that will show all categories-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- //test button  -->
                  <button onclick="testBUtton()">here</button>
                  <footer>
                    <p> &copy to-do-app </p>
                  </footer>
                  <!-- pop ups below -->
                  <div id="addCategoryPopup">
                    <div class="popUpContent">
                      <!-- content -->
                      <h2>Create Category</h2>
                      <form:form id="categoryForm" modelAttribute="categoryForm">
                        <form:input type="hidden" name="user" path="user" value=" ${user.id} " />
                        <div>
                          <form:input class="input" name="name" path="name" placeHolder="name" />
                        </div>
                        <div id="radioHolder">
                          <div class="radioContainer">
                            <form:radiobutton class="dueRadio_input" path="priority" name="priority" value="1"
                              id="one" />
                            <label class="dueRadio_label" for="one">low</label>
                            <form:radiobutton class="dueRadio_input" path="priority" name="priority" value="2"
                              id="two" />
                            <label class="dueRadio_label" for="two">normal</label>
                            <form:radiobutton class="dueRadio_input" path="priority" name="priority" value="3"
                              id="three" />
                            <label class="dueRadio_label" for="three">High</label>
                          </div>
                        </div>
                        <input id="btn" type="submit" value="Add" />
                      </form:form>
                    </div>
                  </div>
                  <div id="addTaskPopup">
                    <div class="taskPopUpContent">
                      <h2>Add task</h2>
                      <form:form id="taskForm" modelAttribute="taskForm">
                        <form:input type="hidden" name="category_id" path="category" value=" ${categoryToShow.id} " />
                        <div>
                          <form:input class="input" name="name" path="name" placeHolder="name" />
                        </div>
                        <div id="radioHolder">
                          <div class="radioContainer">
                            <form:radiobutton class="dueRadio_input" path="priority" name="priority" value="1"
                              id="one_task" />
                            <label class="dueRadio_label" for="one_task">low</label>
                            <form:radiobutton class="dueRadio_input" path="priority" name="priority" value="2"
                              id="two_task" />
                            <label class="dueRadio_label" for="two_task">normal</label>
                            <form:radiobutton class="dueRadio_input" path="priority" name="priority" value="3"
                              id="three_task" />
                            <label class="dueRadio_label" for="three_task">High</label>
                          </div>
                        </div>
                        <div>
                          <form:input type="date" class="input" path="due" placeHolder="due" />
                        </div>
                        <div>
                          <form:input class="input" path="location" placeHolder="location" />
                        </div>
                        <div>
                          <form:input class="input" path="notes" placeHolder="notes" />
                        </div>
                        <input id="btn" type="submit" value="Add" />
                      </form:form>
                    </div>
                  </div>
                  <!-- let user know progress on adding items -->
                  <div class="loader">
                    <div></div>
                    <p class="loaderP"></p>
                  </div>
                  <script type="text/javascript" src="<c:url value='/js//popUpController.js' />"></script>
                  <script type="text/javascript" src="<c:url value='/js//validateForms.js' />"></script>
                  <script type="text/javascript" src="<c:url value='/js//retrieveData.js' />"></script>
                </body>

                </html>