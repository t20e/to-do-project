if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('on mobile');
    const mainContainer = $('#mainContainer')
    const row1 = $('.row1')
    const themeToggle = $('.btn1div')
    themeToggle.remove()
    row1.remove()
    row1.prependTo(mainContainer)
    themeToggle.prependTo(mainContainer)
}