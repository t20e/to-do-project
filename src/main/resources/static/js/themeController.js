function UserPcTheme(){
    let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return theme;
}
function loadTheme(theme){
    console.log(`theme is ${theme}`);
    if(theme === 'dark'  ){
        lightThemeOn = false 
        changeTheme()
    }
    else{
        lightThemeOn = false
        changeTheme()
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadTheme(UserPcTheme());
})

// const root = document.querySelector(':root')
let lightThemeOn = true;
const body = document.body.style
const root = $("html").get(0).style
const lightTheme = () => {
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
}
const changeTheme = () => {
    if (lightThemeOn) {
        lightTheme()
    } else {
        darkThemeColors()
    }
}

$('#themeToggle').click(function () {
    lightThemeOn = !lightThemeOn
    document.cookie = `lightThemeOn= ${lightThemeOn}`;
    changeTheme()
})