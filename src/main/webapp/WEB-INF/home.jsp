<%@page import="javax.swing.text.View" %>
  <%@page import="com.avis.todo.models.Category" %>
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
                      <link rel="stylesheet" href="<c:url value=" /css/formPopupStyle.css" /> ">
                      <link rel="stylesheet" href="<c:url value=" /css/calendar.css" /> ">
                      <link rel="stylesheet" href="<c:url value=" /css/home_page.css" /> ">
                  <script type="text/javascript" defer src="<c:url value='/js/themeController.js' />"></script>
                  <script type="text/javascript" src="<c:url value='/js//formSubmissionHandler.js' />"></script>
                  <script type="text/javascript" defer src="<c:url value='/js/calendarController.js' />"></script>
                  <script type="text/javascript" defer src="<c:url value='/js/retrieveData.js' />"></script>
                  <script type="text/javascript" defer src="<c:url value='/js/popUpController.js' />"></script>
                  <script type="text/javascript" defer src="<c:url value='/js/validateForms.js' />"></script>
                </head>

                <body>
                  <div id="mainContainer">
                    <div class="btn1div">
                      <input type="checkbox" id="themeToggle" name="btnToggle">
                    </div>
                    <div class="columnContainer">
                      <div class="columnLeft">
                        <div class="row1">
                          <div class="calenderContainer">
                            <div class="calendar">
                              <div class="calendar-header">
                                <span class="month-picker" id="month-picker">
                                </span>
                                <div class="year-picker">
                                  <span class="year-change" id="prev-year">
                                    <pre><</pre>
                                  </span>
                                  <span id="year"></span>
                                  <span class="year-change" id="next-year">
                                    <pre>></pre>
                                  </span>
                                </div>
                              </div>
                              <div class="calendar-body">
                                <div class="calendar-week-day"></div>
                                <div class="calendar-days">
                                </div>
                              </div>
                              <div class="month-list"></div>
                            </div>
                          </div>
                        </div>
                        <div class="row2">
                          <!-- selected category  -->
                          <div class="selectedCategoryContainer">
                            <div class="selectedCategoryName">
                              <H2 class="shownTaskHeader">All Tasks</H2>
                            </div>
                            <div class="imgPlusDiv">
                              <img src="/images/plus_sign.svg" id="addTaskPlusImg" alt="plus sign">
                            </div>
                            <div class="tasksList">
                              <c:forEach items='${ user.tasks }' var='task'>
                                  <div class="repeatCheckbox --r${task.id}">
                                    <c:if test='${task.complete == false }'>
                                      <label class="checkBoxLabel">
                                        <input type="checkbox" name='${task.id}input'
                                          onchange="completeTask(`${task.id}`)">
                                        <span class="checkmark --span${task.id}"></span>
                                      </label>
                                      <p class="taskParagraph --p${task.id}">${task.name}</p>
                                    </c:if>
                                    <c:if test='${task.complete == true}'>
                                      <label class="checkBoxLabel">
                                        <input type="checkbox" checked name='${task.id}input'
                                          onchange="completeTask(`${task.id}`)">
                                        <span class="checkmark --taskFormComplete --span${task.id}"></span>
                                      </label>
                                      <p class="taskParagraph --taskComplete --p${task.id}">${task.name}</p>
                                    </c:if>
                                  </div>
                                </c:forEach>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="columnRight">
                        <div class="dashboard">
                          <!-- shows user info and all categories in order by priority {always show all task as main}-->
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
                              <div class="rowRepeat --selectCatDiv0">
                                <p>All Tasks</p>
                              </div>
                            </button>
                            <c:forEach items='${ user.categories }' var='category'>
                              <button class="retrieveDataBtn" onclick="getTasksPerCat('${category.id}')">
                                <div class="rowRepeat --selectCatDiv${category.id}">
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
                  <!-- pop ups below -->
                  <div id="addCategoryPopup">
                    <div class="popUpContent addCatPopUp">
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
                    <div class="taskPopUp popUpContent">
                      <h2>Add task</h2>
                      <form:form id="taskForm" modelAttribute="taskForm">
                        <form:input type="hidden" id="category_id" name="category" path="category" value="" />
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
                        <!-- TODO -->
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
                  <footer>
                    <p> &copy to-do-app </p>
                  </footer>
                </body>

                </html>