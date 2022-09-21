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
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>To Do App</title>
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
                    <link rel="stylesheet" href="<c:url value=" /css/formPopupStyle.css" /> ">
                    <link rel="stylesheet" href="<c:url value=" /css/calendar.css" /> ">
                    <link rel="stylesheet" href="<c:url value=" /css/home_page.css" /> ">
                    <script type="text/javascript" defer src="<c:url value='/js/mobileViewController.js' />"></script>
                    <script type="text/javascript" defer src="<c:url value='/js/themeController.js' />"></script>
                    <script type="text/javascript" defer src="<c:url value='/js/formSubmissionHandler.js' />"></script>
                    <script type="text/javascript" defer src="<c:url value='/js/miscellaneous.js' />"></script>
                    <%-- IMPORTANT ANY SORT OF JQUERY THAT SUBMITS NEEDS TO LOAD AFTER THE PAGE SO IT CAN BIND!! --%>
                    <script type="text/javascript" defer src="<c:url value='/js/retrieveData.js' />"></script>
                      <script type="text/javascript" defer src="<c:url value='/js/calendarController.js' />"></script>
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
                              <div class="showTaskPerCalDay">
                              </div>
                            </div>
                          </div>
                        </div>


                        <div class="row2">
                          <%-- <!-- selected category --> --%>
                            <div class="selectedCategoryContainer">
                              <div class="selectedCategoryName">
                                <H2 class="shownTaskHeader">All Tasks</H2>
                              </div>
                              <div class="imgPlusDiv">
                                <img src="https://portfolio-avis-s3.s3.amazonaws.com/app/icons/plus_sign.svg"
                                  id="addTaskPlusImg" alt="plus sign">
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
                                <c:if test="${ user.tasks.size() == 0 }">
                                  <p class="notaskParagraph">you don't have any tasks yet, create a category to get
                                    started</p>
                                </c:if>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div class="columnRight">
                        <div class="dashboard">
                          <%-- <!-- shows user info and all categories in order by priority {always show all task as
                            main}--> --%>
                            <div class="rowDashNav">
                              <img src="https://portfolio-avis-s3.s3.amazonaws.com/app/icons/logo.svg" alt="">
                              <h3> hey, ${ user.firstName } </h3>
                              <div class="userActions">
                                <a href="/todo/logout">logout</a>
                              </div>
                            </div>
                            <div class="rowRepeatContainer">
                              <%-- <!-- this will call jquery to get all tasks for user in all tasks table --> --%>
                                <button class="retrieveDataBtn" onclick="getAllTasks()">
                                  <div class="rowRepeat --selectCatDiv0">
                                    <p>All Tasks</p>
                                  </div>
                                </button>
                                <script>
                                  let allCategoriesInOrder = [];
                                </script>
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
                              <img src="https://portfolio-avis-s3.s3.amazonaws.com/app/icons/plus_sign.svg"
                                id="addCategoryPlusImg" alt="plus sign">
                              <%-- <!-- if category contains more then 15 categories then display a pull down that will
                                show all categories--> --%>
                            </div>
                        </div>
                      </div>

                    </div>
                    <footer>
                      <p> &copy to-do-app </p>
                    </footer>
                  </div>
                  <%-- <!-- pop ups below --> --%>
                    <div id="addCategoryPopup">
                      <div class="popUpContent addCatPopUp">
                        <%-- <!-- content --> --%>
                          <h2>Create Category</h2>
                          <form id="categoryForm">
                            <!-- <input type="hidden" name="user" path="user" value="${user.id}"> -->
                            <div>
                              <input type="text" class="input catName" name="name" path="name" placeHolder="name">
                              <span class="inputErr --catName"></span>
                            </div>
                            <div id="radioHolder">
                              <div class="radioContainer">
                                <input type="radio" class="dueRadio_input catRadio" path="priority" name="priority"
                                  value="1" id="one">
                                <label class="dueRadio_label" for="one">low</label>

                                <input type="radio" class="dueRadio_input catRadio" path="priority" name="priority"
                                  value="2" id="two">
                                <label class="dueRadio_label" for="two">normal</label>

                                <input type="radio" class="dueRadio_input catRadio" path="priority" name="priority"
                                  value="3" id="three">
                                <label class="dueRadio_label" for="three">High</label>
                              </div>
                            </div>
                            <span class="inputErr --catRadio"></span>
                            <input id="btn" class="btnCatForm" type="submit" value="Add" />
                          </form>
                          <button class="closePopUp" onclick="closePopups('#addCategoryPopup')">close</button>
                      </div>
                    </div>
                    <div id="addTaskPopup">
                      <div class="taskPopUp popUpContent">
                        <h2>Add task</h2>
                        <form id="taskForm">
                          <input type="hidden" id="category_id" name="category" value="">
                          <div>
                            <input type="text" class="input taskName" name="name" placeHolder="name">
                            <span class="inputErr --taskName"></span>
                          </div>
                          <div id="radioHolder">
                            <div class="radioContainer">
                              <input type="radio" class="dueRadio_input taskRadio" name="priority" value="1"
                                id="one_task">
                              <label class="dueRadio_label" for="one_task">low</label>
                              <input type="radio" class="dueRadio_input taskRadio" name="priority" value="2"
                                id="two_task">
                              <label class="dueRadio_label" for="two_task">normal</label>
                              <input type="radio" class="dueRadio_input taskRadio" name="priority" value="3"
                                id="three_task">
                              <label class="dueRadio_label" for="three_task">High</label>
                            </div>
                          </div>
                          <span class="inputErr --taskRadio"></span>
                          <div>
                            <input type="date" type="date" class="input taskDue" name="due" placeHolder="due" />
                            <span class="inputErr --taskDue"></span>
                          </div>
                          <div>
                            <input type="text" class="input taskLocation" name="location" placeHolder="location">
                            <span class="inputErr --taskLocation"></span>
                          </div>
                          <div>
                            <input type="text" class="input taskNotes" name="notes" placeHolder="notes">
                            <span class="inputErr --taskNotes"></span>
                          </div>
                          <input id="btn" class="btnTaskForm" type="submit" value="Add" />
                        </form>
                        <button class="closePopUp" onclick="closePopups('#addTaskPopup')">close</button>
                      </div>
                    </div>
                    <%-- <!-- let user know progress on adding items --> --%>
                      <div class="loader">
                        <div></div>
                        <p class="loaderP"></p>
                      </div>
                      <a
                      href="https://github.com/t20e/to-do-project">
                      <img id="linkImg" src="https://portfolio-avis-s3.s3.amazonaws.com/app/icons/gitCodeLink_img-01.png"
                          alt="link img">
                  </a>
                </body>

                </html>