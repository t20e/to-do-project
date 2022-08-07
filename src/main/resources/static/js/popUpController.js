$(document).ready(function () {
    // controller pop ups
    $('#addCategoryPlusImg').click(function () {
        $('#addCategoryPopup').addClass("show");
        $('#mainContainer').css("filter", "blur(5px)");
    })
    $('#addTaskPlusImg').click(function () {
        $('#addTaskPopup').addClass("show");
        $('#mainContainer').css("filter", "blur(5px)");
    })
    // close pop up
    // $(document).click(function (e) {
//   if ($(e.target).closest(".popUpContent").length !== 0) {
//     closePopups("#addCategoryPopup");
//     console.log("gi");
//   } else if ($(e.target).closest("#addTaskPopup").length !== 0) {
//     closePopups('#addTaskPopup');
//     console.log('hi');
//   }
// });

//                                  .popUpContent
  //                           #addTaskPopup
  //                            #addCategoryPopup
})

const taskAddBtn = () => {
    if ($('.shownTaskHeader').text() == 'All Tasks') {
        $('.imgPlusDiv').css("display", "none");
    }else{
        $('.imgPlusDiv').css("display", "flex");
    }
}
taskAddBtn()
const closePopups = (popUp) => {
    $(popUp).removeClass("show");
    $("#mainContainer").css("filter", "blur(0px)");
  };


