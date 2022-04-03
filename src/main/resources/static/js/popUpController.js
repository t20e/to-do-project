let addCategoryPopUp = document.getElementById("addCategoryPopup");
let addTaskPopup = document.getElementById("addTaskPopup");
const mainContainer = document.getElementById("mainContainer");
// add category 
document.getElementById('addCategory').addEventListener('click',function(){
    // document.querySelectorAll('addCategoryPopup').style.display = 'flex';
    addCategoryPopUp.classList.add("show");
    mainContainer.style.filter = "blur("+5  + "px)"
})


document.getElementById('addTaskPlusSign').addEventListener('click',function(){
    // document.querySelectorAll('addCategoryPopup').style.display = 'flex';
    addTaskPopup.classList.add("show");
    mainContainer.style.filter = "blur("+5  + "px)"

})





