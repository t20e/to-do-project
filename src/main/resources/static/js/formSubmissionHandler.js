let allCategoriesInOrder = [];
const showProgressLoader = (task) => {
  $(".loader").addClass("show");
  $(".loaderP").text(task);
  // stop user from creating more tasks if this is still loading
  $("#addCategoryPlusImg").addClass("disallow");
};
const closeProgressLoader = () => {
  $(".loader").animate({ left: "-200px" });
  setTimeout(() => {
    $(".loader").removeClass("show");
    $(".loader").animate({ left: "0pc" });
  }, 500);
  $("#addCategoryPlusImg").removeClass("disallow");
};
const findError = (error) => {
  console.log(error, "error");
};
const addSelectedCatAsShown = (data) => {
  //retrieve that data from db and see if it has any tasks
  document.title = `category • ${data.category_name}`;
  $(".selectedCategoryName")
    .empty()
    .append(`<H2 class="shownTaskHeader">${data.category_name}</H2>`);
  taskAddBtn();
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
      if (item.complete) {
        taskHolder = `
        <label class="checkBoxLabel">
          <input type="checkbox" name="task_id" onchange="completeTask(${item.id})">
         <span class="checkmark"></span>
        </label>
        <p class="taskParagraph">${item.name}</p>`;
      } else {
        taskHolder = `
        <label class="checkBoxLabel">
          <input type="checkbox" checked name="task_id"
          onchange="completeTask(${item.id})">
          <span class="checkmark --taskFormComplete"></span>
        </label>
        <p class="taskParagraph --taskComplete">${item.name}</p>`;
      }
      $(".tasksList").append(
        `<div class="repeatCheckbox">${taskHolder}</div>`
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
  postData("/api/task/complete", formData, form);
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
  postData("/api/category/add", formData, form);
});
// FIXME for some reason its not allowinf me to create more tasks
$("#taskForm").submit(function (e) {
  e.preventDefault();
  showProgressLoader("adding task");
  let formData = {};
  let form = this;
  $.each(this.elements, function (i, v) {
    let input = $(v);
    formData[input.attr("name")] = input.val();
    delete formData["undefined"];
  });
  formData.category = { id: Number(formData.category) };
  // console.log(formData);
  postData("/api/task/add", formData, form);
});
const toggleTaskCheckbox = (taskId) => {
  let input = $("input[name=" + taskId + "input]");
  input.attr("checked", !input.attr("checked"));
  let span = $('.--span' + taskId)
  span.toggleClass('--taskFormComplete')
  let p = $('.--p' + taskId);
  p.toggleClass('--taskComplete')
  // TODO remove the main div then append it back but at the end of the taskLists
};
// const moveTask = (id)=>{
//   const taskDiv = $('.--r'+ id)
//   $('.--r'+id).remove()
//   console.log('ji');
//   clearTimeout(moveTask)
// }

const postData = (url, formData, form) => {
  // console.log("submitted");
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
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
            break;
          case "task":
            closePopups("#addTaskPopup");
            $("#taskForm").trigger("reset");
            getTasksPerCat(callback.cat);
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
        // alert("error. Reloading page");
        // window.location.reload()
      }
    },
    error: function (xhr, status, errMsg) {
      console.log(xhr, status, errMsg);
      console.error(" adding to db");
    },
  });
};
