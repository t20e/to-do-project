$(document).ready(function () {
    const numPattern = new RegExp("^[0-9]*$");
    const nameRegex = /^[a-zA-Z\s]*$/;
    const onlyNumRegexPos = /^[0-9]*$/
    const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/
    const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    // anything with -- is for the inputs spans
    const catForm = {
        "nameInput" : $('.catName'),
        "nameSpan": $('.--catName'),
        "nameVar": false,
        "radioInput": $('.catRadio'),
        "catRadio": $('.--catRadio'),
        "radioVar": false,
        "btn": $('.btnCatForm')
    }
    const taskForm = {
        "nameInput" : $('.taskName'),
        "nameSpan" : $('.--taskName'),
        "nameVar" : false,
        "radioInput" : $('.taskRadio'),
        "radioSpan" : $('.--taskRadio'),
        "radioVar" : false,
        // below is optional
        // "dueInput" : $('.taskDue'),
        // "dueSpan" : $('.--taskDue'),
        // "dueVar" : false,
        // "locationInput" : $('.taskLocation'),
        // "locationSpan" : $('.--taskLocation'),
        // "locationVar" : false,
        // "notesInput" : $('.taskNotes'),
        // "notesSpan" : $('.--taskNotes'),
        // "notesVar" : false,
        'btn' : $('.btnTaskForm')

    }

    const nameIsShort = "name needs to be more than 2 character"
    const onlyLetters = "should only contain characters"
    // validate
    $(function () {
        catForm.nameInput.on("keyup", function(e) {validateLetters($(this), catForm)})
        catForm.radioInput.on('click', function(){
            catForm.radioVar = true
            allowFormSubmit(catForm)
        })
        // task form
        taskForm.nameInput.on("keyup", function(e) {validateLetters($(this), taskForm)})
        taskForm.radioInput.on('click', function(){
            taskForm.radioVar = true
            allowFormSubmit(taskForm)
        })
        // taskForm.dueInput.on("change", function(e) {
    //         if(!dateRegex.test($(this).val())){
    //             taskForm.dueInput = false
                    // change the span text!!!
    //         }else{
    //             taskForm.dueInput = true
    //         }
    //         allowFormSubmit(taskForm)
    // })

    })
    const validateLetters = (input, object)=>{
        if(!nameRegex.test(input.val())){
            object.nameSpan.show().text(onlyLetters)
            object.nameVar = false
        }else if(input.val().length < 2){
            object.nameVar = false
            object.nameSpan.show().text(nameIsShort)
        }else{
            object.nameVar = true
            object.nameSpan.hide()
        }
        allowFormSubmit(object)
    }
    

    // TODO allow submit buttons
    const allowFormSubmit = (object)=>{
        if(object == catForm){
            if(catForm.nameVar == true && catForm.radioVar == true){
                catForm.btn.addClass('allow')
            }else{
                catForm.btn.removeClass('allow')
            }
        }else{
            if(taskForm.nameVar == true && taskForm.radioVar == true){
                taskForm.btn.addClass('allow')
            }else{
                taskForm.btn.removeClass('allow')
            }
        }
    }

})