const cardColor = document.querySelector(".box-generate");

const mainColor = document.querySelector(".box-generate div:first-of-type");
const rgb = document.querySelector(".box-generate div:last-of-type");

const btnGen = document.querySelector("button:first-of-type");
const btnCopy = document.querySelector("button:last-of-type");

const history = document.querySelector(".history");
const historyColors = document.querySelectorAll(".history .history-color  div");

let ColorIndex = 0;

// console.log((Math.random() * 16777215).toString(16));

function updateColor() {
  const RandomColor = Math.floor(Math.random() * 16777216);
  const color = "#" + RandomColor.toString(16).padStart(6, "0");
  const r = (RandomColor >> 16) & 255;
  const g = (RandomColor >> 8) & 255;
  const b = RandomColor & 255;
  const rgb = `rgb(${r},${g},${b})`;
  console.log(color);
  console.log(rgb);
  return { color, rgb };
}

let currentColor = updateColor();

function displayColor() {
  cardColor.style.backgroundColor = currentColor.color;
  mainColor.textContent = currentColor.color;
  rgb.textContent = currentColor.rgb;
}
displayColor(); //بتشتغل لما الصفحه تتحمل عشان نحل مشكله النسخ

btnGen.addEventListener("click", () => {
  currentColor = updateColor();
  displayColor();
});

btnCopy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(currentColor.color); //Clipboard API
  displayHistoryColor();
});

//history
function displayHistoryColor() {
  const item = historyColors[ColorIndex % historyColors.length];
  item.style.backgroundColor = currentColor.color;
  item.dataset.color = currentColor.color;
  item.dataset.rgb = currentColor.rgb;
  ColorIndex++;
}

//display history color on card
historyColors.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedColor = item.dataset.color;
    const selectedColorRGB = item.dataset.rgb;
    if (!selectedColor) return;

    currentColor.color = selectedColor;
    currentColor.rgb = selectedColorRGB
    cardColor.style.backgroundColor = selectedColor;
    mainColor.textContent = selectedColor;
    rgb.textContent = selectedColorRGB;
  });
});
