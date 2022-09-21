let currentCat = { img: null, div: null }

const addSelectedCatAsShown = (data) => {
  //retrieve that data from db and see if it has any tasks
  document.title = `category • ${data.category_name}`;
  $(".selectedCategoryName")
    .empty()
    .append(`<H2 class="shownTaskHeader">${data.category_name}</H2>`);
  taskAddBtn();
  moveTheCurrCatArrow(data.category_id)
  //change the value of the input to equal that of the category
  $("#category_id").val(Number(data.category_id));
  if (data.task_in_this_cat == false) {
    $(".tasksList")
      .empty()
      .append(
        `<p class="notaskParagraph">no existing tasks are in this category, click the plus icon to add a task</p>`
      );
  } else {
    $(".tasksList").empty();
    data.allTaskPerCat.forEach((item) => {
      let taskHolder;
      if (item.complete == false) {
        taskHolder = `
        <label class="checkBoxLabel">
        <input type="checkbox" name='${item.id}input'
          onchange="completeTask(${item.id})">
        <span class="checkmark --span${item.id}"></span>
      </label>
      <p class="taskParagraph --p${item.id}">${item.name}</p>`;
      } else {
        taskHolder = `
        <label class="checkBoxLabel">
        <input type="checkbox" checked name='${item.id}input'
          onchange="completeTask(${item.id})">
        <span class="checkmark --taskFormComplete --span${item.id}"></span>
      </label>
      <p class="taskParagraph --taskComplete --p${item.id}">${item.name}</p>`;
      }
      $(".tasksList").append(
        `<div class="repeatCheckbox --r${item.id}">${taskHolder}</div>`
      );
    });
  }
};

const addCatNameTolistUI = (category_name, category_id, category_priority) => {
  let newItem = {
    name: `${category_name}`,
    id: `${category_id}`,
    priority: `${category_priority}`,
  };
  if (allCategoriesInOrder.length == 0) {
    allCategoriesInOrder.push(newItem);
  } else {
    if (category_priority == 1) {
      allCategoriesInOrder.push(newItem);
    } else {
      for (let i = 0; i < allCategoriesInOrder.length; i++) {
        0;
        if (allCategoriesInOrder[i].priority < category_priority) {
          //check if thats the last item
          allCategoriesInOrder.splice(i, 0, newItem);
          break;
        }
      }
    }
  }
  $(".rowRepeatContainer").empty();
  $(".rowRepeatContainer").append(
    ` <button class="retrieveDataBtn" onclick="getAllTasks()">
        <div class="rowRepeat">
          <p>All Tasks</p>
        </div>
      </button>`
  );
  allCategoriesInOrder.forEach((item) => {
    $(".rowRepeatContainer").append(
      `<button class="retrieveDataBtn" onclick="getTasksPerCat('${item.id}')">
            <div class="rowRepeat">
            <p>${item.name}</p>
            </div>
            </button>`
    );
  });
  getTasksPerCat(category_id);
};

const completeTask = (task_id) => {
  // console.log(typeof(Number(task_id)));
  let formData = { taskId: Number(task_id) };
  let form = {};
  postData("/todo/api/task/complete", formData, form);
};
$("#categoryForm").submit(function (e) {
  e.preventDefault();
  showProgressLoader("creating Category");
  let formData = {
    name: $('input[name="name"]').val(),
    priority: $('input[name="priority"]:checked').val(),
  };
  let form = this;
  console.log(formData);
  postData("/todo/api/category/add", formData, form);
});
// FIXME for some reason its not allowinf me to create more tasks
$("#taskForm").submit(function (e) {
  e.preventDefault();
  showProgressLoader("adding task");
  let formData = {};
  let form = this;
  $.each(this.elements, function (i, v) {
    let input = $(v);
    if(input.attr("name") !== 'priority'){
      formData[input.attr("name")] = input.val();
      console.log(input.val());
      delete formData["undefined"];
    }
  });
  formData['priority'] = $("input[name='priority']:checked").val()
  formData.category = { id: Number(formData.category) };
  console.log(formData);
  postData("/todo/api/task/add", formData, form);
});
const toggleTaskCheckbox = (taskId) => {
  let input = $("input[name=" + taskId + "input]");
  input.attr("checked", !input.attr("checked"));
  let span = $('.--span' + taskId)
  span.toggleClass('--taskFormComplete')
  let p = $('.--p' + taskId);
  p.toggleClass('--taskComplete')
  // TODO remove the main div then append it back but at the end of the taskLists
  let taskDiv = $('.--r' + taskId)
  if (span.hasClass('--taskFormComplete')) {
    setTimeout(function () {
      $('.--r' + taskId).remove()
      $('.tasksList').append(taskDiv)
    }, 1000)
  } else {
    setTimeout(function () {
      $('.--r' + taskId).remove()
      $('.tasksList').prepend(taskDiv)
    }, 1000)
  }
};

const postData = (url, formData, form) => {
  // console.log("submitted");
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(formData),
    context: form,
    success: function (callback) {
      console.log("connected to db", callback);
      // check if validations passed
      if (callback.validations == "passed") {
        closeProgressLoader();
        switch (callback.purpose) {
          case "completeTask":
            toggleTaskCheckbox(callback.taskId);
            addTasksToCalendar(currentMonth.value + 1, currentYear.value);
            break;
          case "task":
            closePopups("#addTaskPopup");
            $("#taskForm").trigger("reset");
            getTasksPerCat(callback.cat);
            addTasksToCalendar(currentMonth.value + 1, currentYear.value);
            break;
          case "category":
            closePopups("#addCategoryPopup");
            addCatNameTolistUI(
              formData.name,
              callback.category_id,
              callback.category_priority
            );
            taskAddBtn();
            $("#categoryForm").trigger("reset");
            break;
        }
      } else {
        showProgressLoader('error please try again')
        setTimeout(() => {
          closeProgressLoader();
        }, 4000);
      }
    },
    error: function (xhr, status, errMsg) {
      console.log(xhr, status, errMsg);
      console.error(" adding to db");
    },
  });
};
