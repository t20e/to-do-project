const showProgressLoader = (task) => {
    $(".loader").addClass("show");
    $(".loaderP").text(task);
    // stop user from creating more tasks if this is still loading
    $("#addCategoryPlusImg").addClass("disallow");
};
$('.loaderP').text('null')
const tips = ['Hover over calendar day to show what tasks are due!', 'if your on mobile click the months day to see whats due', 'click the month to select a new month', 'add more tasks!', 'create more categories!', 'toggle theme checkbox']
const showTips = () => {
    // console.log($('.loaderP').text());
    setInterval(function () {
        if ($('.loaderP').text() == 'null') {
            showProgressLoader(`tip: ${tips[Math.floor(Math.random() * tips.length)]}`)
            setTimeout(function () {
                closeProgressLoader()
            }, 4000)
        }
    }, 25000)
}

showTips()

const closeProgressLoader = () => {
    $(".loader").animate({ left: "-400px" });
    setTimeout(() => {
        $(".loader").removeClass("show");
        $(".loader").animate({ left: "0pc" });
        $('.loaderP').text('null')
    }, 500);
    $("#addCategoryPlusImg").removeClass("disallow");
};

const moveTheCurrCatArrow = (id) => {
    if (currentCat.img !== null) {
        currentCat.img.remove()
    }
    currentCat.div = $('.--selectCatDiv' + id)
    currentCat.div.prepend(`<img src="https://portfolio-avis-s3.s3.amazonaws.com/app/icons/dark_blue_arrow_right.svg" class="currentCatArrow --arrowImg${id}" alt="current selected category">`)
    currentCat.img = $(".--arrowImg" + id)
}