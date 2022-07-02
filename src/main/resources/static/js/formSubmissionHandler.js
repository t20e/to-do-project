let allCategoriesInOrder = []
const closePopups = (popUp) => {
    $(popUp).removeClass("show");
    $('#mainContainer').css("filter", "blur(0px)");
}
const showProgressLoader = (task) => {
    $('.loader').addClass('show')
    $('.loaderP').text(task)
    // stop user from creating more tasks if this is still loading 
    $('#addCategoryPlusImg').addClass('disallow')
}
const closeProgressLoader = () => {
    $('.loader').animate({ left: '-200px' })
    setTimeout(() => {
        $('.loader').removeClass('show')
        $('.loader').animate({ left: '0pc' })
    }, 500);
    $('#addCategoryPlusImg').removeClass('disallow')
}
const findError = (error) => {
    console.log(error, "error");
}
const addSelectedCatAsShown = (data) => {
    //retrieve that data from db andd see if it has any tasks
    $('.selectedCategoryName').empty().append(
        `<H2>${data[0].category_name}</H2>`
    )
    if (data[2] == false) {
        $('.tasksList').empty().append(
            ` <div class="checkBoxContainer">
                     <p class="notaskParagraph">no existing tasks are in this category, click the plus icon to add a task</p>
            </div>`
        )
    } else {
        data.shift()
        $('.tasksList').empty()
        data.forEach(item => {
            $('.tasksList').append(
                `<div class="checkBoxContainer">
                <div class="repeatCheckbox">
                    <label class="checkBoxLabel">
                        <input type="checkbox" path="${item.id}" id="${item.name}">
                        <span class="checkmark"></span>
                    </label>
                     <p class="taskParagraph">${item.name}</p>
                </div>
            </div>`
            )
        })
    }
}

const addCatNameTolistUI = (category_name, category_id, category_priority) => {
    let newItem = { "name": `${category_name}`, "id": `${category_id}`, "priority": `${category_priority}` }
    if (category_priority == 1) {
        allCategoriesInOrder.push(newItem)
    } else {
        for (let i = 0; i < allCategoriesInOrder.length; i++) {0
            if (allCategoriesInOrder[i].priority < category_priority) {
                //check if thats the last item 
                allCategoriesInOrder.splice(i, 0, newItem)
                break;
            }
        }
    }
    $('.rowRepeatContainer').empty();
    $('.rowRepeatContainer').append(
        ` <button class="retrieveDataBtn" onclick="getAllTasks()">
        <div class="rowRepeat">
          <p>All Tasks</p>
        </div>
      </button>`
    );
    allCategoriesInOrder.forEach((item) => {
        $('.rowRepeatContainer').append(
            `<button class="retrieveDataBtn" onclick="getTasksPerCat('${item.id}')">
            <div class="rowRepeat">
            <p>${item.name}</p>
            </div>
            </button>`
        )
    })
    getTasksPerCat(category_id)
}
$(document).ready(function () {
    $('#categoryForm').submit(function (e) {
        e.preventDefault()
        showProgressLoader('creating Category')
        let formData = {
            name: $('input[name="name"]').val(),
            priority: $('input[name="priority"]:checked').val(),
        };
        let form = this;
        console.log(formData);
        postData("/api/category/add", formData, form)
    })
    $('#taskForm').submit(function (e) {
        e.preventDefault()
        showProgressLoader('adding task')
        let formData = {};
        let form = this;
        $.each(this.elements, function (i, v) {
            let input = $(v);
            formData[input.attr("name")] = input.val();
            delete formData["undefined"];
        });
        if(formData.category == ''){
            delete formData.category;
        }
        postData("/api/task/add", formData, form)
    })
    const postData = (url, formData, form) => {
        console.log('submitted');
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(formData),
            context: form,
            success: function (callback) {
                console.log(callback);
                // check if validations passed
                if (callback.validations == "passed") {
                    closePopups('#addCategoryPopup')
                    closeProgressLoader()
                    switch(callback.purpose){
                        case 'task':
                            $("#taskForm").trigger("reset");
                            //get task to show on ui
                            break;
                        case 'category':
                            addCatNameTolistUI(formData.name, callback.category_id, callback.category_priority)
                            $("#categoryForm").trigger("reset");
                            break;
                    }
                } else {
                    alert("error. Reloading page");
                    window.location.reload()
                }
            },
            error: function (xhr, status, errMsg) {
                console.log(xhr, status, errMsg);
                console.error(' adding to db');
            }
        })
    }
})