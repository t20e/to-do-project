const getTasksPerCat = (categoryId) => {
    console.log(categoryId);
    let retrieve = ajaxRetrieve(`/api/category/${categoryId}`)
    // if(retrieve.callback){
    //     //do this
    // }
}
// $(document).ready(function(){
// })
const getAllTasks = () => {
    let retrieve = ajaxRetrieve('/api/task/getAll')
}
const ajaxRetrieve = (url) => {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (callback) {
            console.log('successful connection to server', callback);
            return callback;
        },
        error: function (xhr, status, errMsg) {
            console.log(xhr, status, errMsg);
            return 'error'
        }
    })
}

const changeTasksShownHTML = () => {

}