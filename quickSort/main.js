import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";

const numbers = [];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function fillNums(collection) {
  for (let i = 0; i < 25000; i++) {
    collection[i] = randomNumber(1, 30000);
  }
}

/**
 * @param {Array<number>} collection
 */
function fillCard(collection) {
  const card = document.querySelector(".nums-card");
  card.innerHTML = `
    ${collection.map((n, i) => `<span class="num"> ${n}</span>`).join("")}
  `;
}

fillNums(numbers);
fillCard(numbers);
