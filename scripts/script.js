// Variables and contants

const elements = {
    buttons: {
        greenButton: document.querySelector(".buttonChangeColor.green"),
        redButton: document.querySelector(".buttonChangeColor.red"),
        blueButton: document.querySelector(".buttonChangeColor.blue"),
        randomButton: document.querySelector(".buttonChangeColor.random")
    },
    h1: document.querySelector(".h1-title")
}
const colors = {
    green: '#008000',
    red: '#ff0000',
    blue: '#0000ff',
    white: '#ffffff',
    black: '#000000',
    backgroundColor:'#ffffff'
}

let selectedButton;



Object.values(elements.buttons).forEach(button => {
    button.addEventListener('click', onClick);
});

//Functions

function onClick(event) {
    const button = event.target;
    const key = Object.entries(elements.buttons).find(([_, btn]) => btn === button)?.[0];

    if (!key) return;
    
    const isRandom = key === "randomButton";
    let color = isRandom ? randomColor() : colors[key.replace("Button", "")];

    if(isRandom) changeRandomButton(color);
    
    updateBackgroundAndSelection(button, color);
}

function updateBackgroundAndSelection(button, color){

    let isSameColor = color === colors.backgroundColor;

    updateSelectedButton(button, isSameColor? null : color);
    changeBackground(isSameColor? colors.white : color);
}

function updateSelectedButton(newButton, newColor = null){
    if(selectedButton) deselectButton(selectedButton);

    if(selectedButton === elements.buttons.randomButton && newButton !== elements.buttons.randomButton){
        changeRandomButton()
    }

    selectedButton = newColor? newButton : null;
    colors.backgroundColor = newColor || colors.white;

    if(selectedButton){
        selectButton(selectedButton);
    }
}

function changeBackground(color){
    colors.backgroundColor = color;
    document.body.style.backgroundColor = color;

    changeTextColor(color);

}

function changeTextColor(color){
    const textColor = getTextColor(color);

    elements.h1.style.color = textColor;

    elements.buttons.randomButton.style.color = selectedButton === elements.buttons.randomButton
        ? textColor : colors.black;
}

function selectButton(button){
    button.classList.remove('notSelected');
    button.classList.add('hover-effect');
}

function deselectButton(button){
    button.classList.add('notSelected');
    button.classList.remove('hover-effect');
}

function randomColor(){
    return `#${Math.floor( Math.random() * 0xFFFFFF ).toString(16).padStart(6, "0")}`;
}

function changeRandomButton(color = null){
    elements.buttons.randomButton.style.backgroundColor = color || colors.white;
    
}

function getTextColor(hexColor){
    const { r, g, b } = hexToRGB(hexColor);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5 ? "#ffffff" : "#000000";
}

function hexToRGB(hexColor){
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    return {r, g, b}

}

