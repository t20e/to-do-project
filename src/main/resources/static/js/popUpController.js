$('#addCategoryPlusImg').click(function () {
    $('#addCategoryPopup').addClass("show");
    $('#mainContainer').css("filter", "blur(5px)");
})
$('#addTaskPlusImg').click(function () {
    $('#addTaskPopup').addClass("show");
    $('#mainContainer').css("filter", "blur(5px)");
})
// close pop up when click outside 
$(document).click(function (e) {
    if ($('#addCategoryPopup').is(e.target) && $('#addCategoryPopup').has(e.target).length === 0) {
        closePopups("#addCategoryPopup");
        console.log("gi");
    } else if ($('#addTaskPopup').is(e.target) && $('#addTaskPopup').has(e.target).length === 0) {
        closePopups('#addTaskPopup');
        console.log('hi');
    }
});

const taskAddBtn = () => {
    if ($('.shownTaskHeader').text() == 'All Tasks') {
        $('.imgPlusDiv').css("display", "none");
    } else {
        $('.imgPlusDiv').css("display", "flex");
    }
}
taskAddBtn()
const closePopups = (popUp) => {
    $(popUp).removeClass("show");
    $("#mainContainer").css("filter", "blur(0px)");
};


