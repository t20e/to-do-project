const getTasksPerCat = (categoryId) => {
  ajaxRetrieve(`/api/category/${categoryId}`);
};
const getAllTasks = () => {
  ajaxRetrieve("/api/task/getAll");
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
  ajaxRetrieve(`/api/task/forCalendarToShow/${date}`)
}
const showTaskOnMouseOverDay = $('.showTaskPerCalDay')

const addTaskDivOnCal = (data) => {
  let day = data.day.toString()
  // not needed 
  if (day[0] === '0') {
    day = day[1]
  }
  showTaskOnMouseOverDay.addClass('--show')
  let priorityColor, priority;
  data.tasks.forEach(i => {
    console.log(i);
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
    showTaskOnMouseOverDay.empty().append(
      `<div>
      task: ${i.name} 
      <p class=${priorityColor}> priority: ${priority}</p>
        </div>`
    ).find('p').addClass(priorityColor)
  });
}
showTaskOnMouseOverDay.mouseleave(function () {
  showTaskOnMouseOverDay.removeClass('--show')
});

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
      }
    },
    error: function (xhr, status, errMsg) {
      console.log(xhr, status, errMsg);
    },
  });
};

const changeTasksShownHTML = () => { };
