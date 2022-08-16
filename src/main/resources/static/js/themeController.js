const UserPcTheme = () => {
    let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return theme;
}
const loadTheme = (theme) => {
    console.log(`users pc prefer theme is ${theme}`);
    if (theme === 'dark') {
        lightThemeOn = false
    }
    else {
        lightThemeOn = true
    }
    localStorageVar.setItem("lightThemeOn", lightThemeOn)
    changeTheme()
}

let lightThemeOn;
let localStorageVar = localStorage
// for cookies use document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
// document.cookie = `lightThemeOn= ${lightThemeOn}`;

const body = document.body.style
const root = $("html").get(0).style
const lightThemeColors = () => {
    body.backgroundColor = 'white'
    root.setProperty("--primaryColor", "#3aafa9")
    root.setProperty("--secondaryColor", "#2c7b79")
    root.setProperty("--thirdColor", "#17252a")
    root.setProperty("--bgkColor", "#ffff")
    root.setProperty("--nonImportantText", "#727F83")
    root.setProperty("--textColor", "black")
    root.setProperty("--boxShadow", "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px")
    root.setProperty("--boxShadowPopUp", "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px")
    root.setProperty("--borderBoxShadow", "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px")
    root.setProperty("--colorSchema", "light")
}
const darkThemeColors = () => {
    body.backgroundColor = 'black'
    root.setProperty("--primaryColor", "#45a29e")
    root.setProperty("--secondaryColor", "#8ad2d8")
    root.setProperty("--thirdColor", "#c5c6c7")
    root.setProperty("--bgkColor", "#0A0A0A")
    root.setProperty("--nonImportantText", "#727F83")
    root.setProperty("--textColor", "white")
    root.setProperty("--boxShadow", "none")
    root.setProperty("--boxShadowPopUp", "rgba(255, 255, 255, 0.7) 0px 48px 100px 0px")
    root.setProperty("--borderBoxShadow", "")
    root.setProperty("--colorSchema", "dark")
}
const changeTheme = () => {
    // console.log(lightThemeOn);
    // console.log(typeof (lightThemeOn));
    if (lightThemeOn) {
        $('#themeToggle').prop("checked", false)
        lightThemeColors()
    } else {
        $('#themeToggle').prop("checked", true)
        darkThemeColors()
    }
    console.log('changing theme');
}
const loadCurrTheme = () => {
    lightThemeOn = (localStorageVar.getItem("lightThemeOn") === 'true');
    changeTheme()
}

window.onload = ()=>{
    if ("lightThemeOn" in localStorageVar) {
        console.log('theme already in local storage');
        loadCurrTheme()
    } else {
        loadTheme(UserPcTheme());
    }
}
$('#themeToggle').click(function () {
    lightThemeOn = !lightThemeOn
    console.log(lightThemeOn, 'after');
    localStorageVar.setItem("lightThemeOn", lightThemeOn)
    changeTheme()
})

// localStorageVar.clear()


