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
})

const taskAddBtn = () => {
    if ($('.shownTaskHeader').text() == 'All Tasks') {
        $('.imgPlusDiv').css("display", "none");
    }else{
        $('.imgPlusDiv').css("display", "flex");
    }
}
taskAddBtn()


