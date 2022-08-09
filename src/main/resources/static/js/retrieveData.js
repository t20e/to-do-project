const getTasksPerCat = (categoryId) => {
  ajaxRetrieve(`/api/category/${categoryId}`);
};
const getAllTasks = () => {
  ajaxRetrieve("/api/task/getAll");
};
const ajaxRetrieve = (url) => {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function (response) {
      console.log("successful connection to server", response);
      addSelectedCatAsShown(response);
    },
    error: function (xhr, status, errMsg) {
      console.log(xhr, status, errMsg);
    },
  });
};

const changeTasksShownHTML = () => {};
