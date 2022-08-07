// the index to get month_names needs to be a month behind becuase index start at 0; 
//every time query db we need to add one month

isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};
const months_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

$(document).ready(function () {
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let current_year_shown = $("#year");
    let current_month_shown = $("#month-picker");
    let calendar_div = $(".calendar");

    weekdays.forEach((i) => {
        $(".calendar-week-day").append(`<div>${i}</div>`);
    });
    let calendar_days = $(".calendar-days");
    let month_list_div = $(".month-list");
    generateCalender = (month, year, tasks) => {
        let taskObj = {}
        tasks.forEach((task, i) => {
            due = Number(task.due.substr(8, 2));
            taskObj[due] = due
        });
        calendar_days.empty();
        current_month_shown.empty().append(months_names[month]);
        current_date = new Date();
        current_year_shown.html(year);
        let first_day = new Date(year, month, 1);
        // console.log(days_of_month[month], 'days of month', first_day.getDay(), 'first day');
        for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
            let day = document.createElement("div");
            day.className = "day_div";
            if (i >= first_day.getDay()) {
                // console.log(i + ' i ', taskObj[i] +' due');
                $(day)
                    .append(`<span>${i - first_day.getDay() + 1}</span> `)
                    .append("<div class='alertTask'></div>");
                // if (!$(day).find("div").hasClass("--hasTask")) {
                // jquery if it has the --hastask then dont add another --hasTask
                if (taskObj[i - first_day.getDay() + 1] == i - first_day.getDay() + 1) {
                    $(day).find("div").addClass("--hasTask").append("•");
                }
                // }
                if (
                    i - first_day.getDay() + 1 === current_date.getDate() &&
                    year === current_date.getFullYear() &&
                    month == current_date.getMonth()
                ) {
                    $(day).addClass("curr-date");
                }
            }
            calendar_days.append(day)
            // TODO
            // .mouseover(function(){
            //     console.log('hi');
            // })
        }
    };
    let current_date = new Date();
    let currentMonth = { value: current_date.getMonth() };
    let currentYear = { value: current_date.getFullYear() };
    current_month_shown.click(function () {
        month_list_div.addClass("show");
    });
    months_names.forEach((e, index) => {
        let month = document.createElement("div");
        $(month)
            .append(`<div>${e}</div>`)
            .click(function () {
                month_list_div.removeClass("show");
                currentMonth.value = index;
                // console.log(index, 'index');
                addTasksToCalendar(index + 1, currentYear.value)
            });
        month_list_div.append(month);
    });
    $("#prev-year").click(function () {
        addTasksToCalendar(currentMonth.value + 1, currentYear.value -= 1);

    });
    $("#next-year").click(function () {
        addTasksToCalendar(currentMonth.value + 1, currentYear.value += 1);
    });
    // generateCalender(currentMonth.value, currentYear.value)
    const addTasksToCalendar = (currentMonth, currentYear) => {
        // console.log(currentMonth, 'curr month to db');
        // console.log(currentMonth - 1, 'curr month in global var')
        // console.log(currentYear, 'current year to db');
        $.ajax({
            type: "GET",
            url: `/api/task/forCalendar/${currentYear}${currentMonth}`,
            dataType: "json",
            success: function (response) {
                // console.log("successful connection to server for", response);
                generateCalender(
                    Number(response.month - 1),
                    Number(response.year),
                    response.tasks
                );
            },
            error: function (xhr, status, errMsg) {
                console.log(xhr, status, errMsg);
            },
        });
    };
    addTasksToCalendar(currentMonth.value + 1, currentYear.value);
});


