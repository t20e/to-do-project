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
    root.setProperty("--bgkColor", "black")
    root.setProperty("--nonImportantText", "#727F83")
    root.setProperty("--textColor", "white")
    root.setProperty("--boxShadow", "rgba(255, 255, 255, .8) 0px 7px 29px 0px")
    root.setProperty("--boxShadowPopUp", "rgba(255, 255, 255, 0.7) 0px 48px 100px 0px")
    root.setProperty("--borderBoxShadow", "rgba(255, 255, 255, 0.7) 0px 7px 29px 0px")
    root.setProperty("--colorSchema", "dark")
}
const changeTheme = () => {
    // console.log(typeof (localStorageVar.getItem("lightThemeOn")));
    console.log(lightThemeOn);
    console.log(typeof (lightThemeOn));
    if (lightThemeOn) {
        $('#themeToggle').prop("checked", false)
        lightThemeColors()
    } else {
        console.log('hjere');
        $('#themeToggle').prop("checked", true)
        darkThemeColors()
    }
    console.log('changing theme');
}
const loadCurrTheme = () => {
    lightThemeOn = (lightThemeOn === localStorageVar.getItem("lightThemeOn"));
    // console.log(lightThemeOn, 'current local var');
    changeTheme()
}

window.addEventListener('DOMContentLoaded', () => {
    if ("lightThemeOn" in localStorageVar) {
        console.log('theme already in local storage');
        loadCurrTheme()
    } else {
        loadTheme(UserPcTheme());
    }
})
$('#themeToggle').click(function () {
    lightThemeOn = !lightThemeOn
    console.log(lightThemeOn, 'after');
    localStorageVar.setItem("lightThemeOn", lightThemeOn)
    changeTheme()
})

// localStorageVar.clear()


// const toggleBtn = document.getElementById("toggle-btn");
// const theme = document.getElementById("theme");
// let darkMode = localStorage.getItem("dark-mode");

// const enableDarkMode = () => {
//   theme.classList.add("dark-mode-theme");
//   toggleBtn.classList.remove("dark-mode-toggle");
//   localStorage.setItem("dark-mode", "enabled");
// };

// const disableDarkMode = () => {
//   theme.classList.remove("dark-mode-theme");
//   toggleBtn.classList.add("dark-mode-toggle");
//   localStorage.setItem("dark-mode", "disabled");
// };

// if (darkMode === "enabled") {
//   enableDarkMode(); // set state of darkMode on page load
// }

// toggleBtn.addEventListener("click", (e) => {
//   darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
//   if (darkMode === "disabled") {
//     enableDarkMode();
//   } else {
//     disableDarkMode();
//   }
// });