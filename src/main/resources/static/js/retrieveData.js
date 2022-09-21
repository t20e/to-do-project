const getTasksPerCat = (categoryId) => {
  ajaxRetrieve(`/todo/api/category/${categoryId}`);
};
const getAllTasks = () => {
  ajaxRetrieve("/todo/api/task/getAll");
};
const showTaskInfoOnCalendar = (year, month, day) => {
  // console.log(typeof (day));
  if (day.length === 1) {
    day = '0' + day
  }
  if (month.length === 1) {
    month = '0' + month
  }
  date = `${year}${month}${day}`
  ajaxRetrieve(`/todo/api/task/forCalendarToShow/${date}`)
}
const showTaskOnMouseOverDay = $('.showTaskPerCalDay')

const addTaskDivOnCal = (data) => {
  let day = data.day.toString()
  // not needed 
  if (day[0] === '0') {
    day = day[1]
  }
  // console.log(day);
  showTaskOnMouseOverDay.addClass('--show')
  let priorityColor, priority;
  let date = data.tasks[0].due
  date = date.slice(5, 10)
  // console.log(date);
  date = `${months_names[Number(date.slice(0, 2)) - 1]} ${day}`
  showTaskOnMouseOverDay.empty().append(`<h4>${date}</h4>`)
  data.tasks.forEach(i => {
    switch (i.priority) {
      case 1:
        priority = 'low'
        priorityColor = 'priority1'
        break;
      case 2:
        priority = 'normal'
        priorityColor = 'priority2'
        break;
      case 3:
        priority = 'high'
        priorityColor = 'priority3'
        break;
    }
    showTaskOnMouseOverDay.append(
      `<div>
      task: ${i.name} 
      <p class=${priorityColor}> priority: ${priority}</p>
        </div>`
    ).find('p').addClass(priorityColor)
  });
}
// TODO might not be needed
// showTaskOnMouseOverDay.mouseleave(function () {
//   showTaskOnMouseOverDay.removeClass('--show')
// });

const ajaxRetrieve = (url) => {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function (response) {
      console.log("successful connection to server", response);
      switch (response.purpose) {
        case "category":
          addSelectedCatAsShown(response);
          break;
        case "showTaskOnCalendar":
          addTaskDivOnCal(response)
          break;
        case "get_tasks_for_calendar":
          generateCalender(
            Number(response.month - 1),
            Number(response.year),
            response.tasks
          );
          break;
      }
    },
    error: function (xhr, status, errMsg) {
      console.log(xhr, status, errMsg);
    },
  });
};

const changeTasksShownHTML = () => { };
