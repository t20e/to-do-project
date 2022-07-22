isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}
const months_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

$(document).ready(function () {
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let current_year_shown = $('#year')
    let current_month_shown = $('#month-picker')
    let calendar_div = $('.calendar');

    weekdays.forEach(i => {
        $('.calendar-week-day').append(
            `<div>${i}</div>`
        )
    });
    let calendar_days = $('.calendar-days')
    let month_list_div = $('.month-list')
    generateCalender = (month, year) => {
        calendar_days.empty()
        current_month_shown.empty().append(months_names[month])
        current_date = new Date()
        current_year_shown.html(year)
        let first_day = new Date(year, month, 1)
        for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
            let day = document.createElement('div')
            if (i >= first_day.getDay()) {
                $(day).append( i - first_day.getDay() + 1)
                if (i - first_day.getDay() + 1 === current_date.getDate() && year === current_date.getFullYear() && month == current_date.getMonth()) {
                    $(day).addClass('curr-date')
                }
            }
            calendar_days.append(day)
        }
    }
    let current_date = new Date()
    let currentMonth = { value: current_date.getMonth() }
    let currentYear = { value: current_date.getFullYear() }
    current_month_shown.click(function () {
        month_list_div.addClass('show')
    })
    months_names.forEach((e, index) => {
        let month = document.createElement('div')
        $(month).append(`<div>${e}</div>`).click(function () {
            month_list_div.removeClass('show')
            currentMonth.value = index
            generateCalender(currentMonth.value, currentYear.value)
        })
        month_list_div.append(month)
    })
    $('#prev-year').click(function () {
        generateCalender(currentMonth.value, currentYear.value -= 1)
    })
    $('#next-year').click(function () {
        generateCalender(currentMonth.value, currentYear.value += 1)
    })
    generateCalender(currentMonth.value, currentYear.value)

})