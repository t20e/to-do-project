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
    console.log(error);
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
        postData("/api/category/add", formData, form)
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
                if (callback.validations == "passed") {
                    addCatNameTolistUI(formData.name, callback.category_id, callback.category_priority)
                    $("#categoryForm").trigger("reset");
                    closePopups('#addCategoryPopup')
                    closeProgressLoader()
                    //then add that category as the category to show
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
    const addCatNameTolistUI = (category_name, category_id, category_priority) => {
        let newItem = { "name": `${category_name}`, "id": `${category_id}`, "priority": `${category_priority}` }
        if (category_priority == 1) {
            allCategoriesInOrder.push(newItem)
            console.log(allCategoriesInOrder);
        } else {
            for (let i = 0; i < allCategoriesInOrder.length; i++) {
                if (allCategoriesInOrder[i].priority < category_priority) {
                    //check if thats the last item 
                    allCategoriesInOrder.splice(i, 0, newItem)
                    console.log(allCategoriesInOrder);
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
    }
})