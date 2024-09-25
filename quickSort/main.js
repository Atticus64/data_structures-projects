import "./style.css";

/**
 * @type {number[]}
 */
let numbers = [];
let comparations = 0;
let changes = 0;

const sortBtn = document.querySelector(".sort");
const btnClose = document.querySelector(".okBtn")
const dialog = document.querySelector("dialog")
const shuffle = document.querySelector(".unsort");

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function fillNums(collection) {
  for (let i = 0; i < 25000; i++) {
    collection[i] = randomNumber(1, 30000);
  }
}

/**
 * @param {number[]} collection
 */
function fillCard(collection) {
  const card = document.querySelector(".nums-card");
  card.innerHTML = `
    ${collection.map((n, i) => `<span class="num"> ${n}</span>`).join("")}
  `;
}

fillNums(numbers);
fillCard(numbers);

function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i] <= pivot && i <= high - 1) {
      comparations += 1
      i++;
    }

    while (arr[j] > pivot && j >= low + 1) {
      comparations += 1
      j--;
    }
    if (i < j) {
      swap(arr, i, j);
    }
  }
  swap(arr, low, j);

  return j;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  changes += 1;
}

function quickSort(array, low, high) {
  if (low < high) {
    let part = partition(array, low, high)
    
    quickSort(array, low, part - 1);
    quickSort(array, part + 1, high);

    return {
      comparations,
      changes,
    };
  }
}

function openModal({ message }) {
  const msg = document.querySelector("p.message")

  msg.textContent = message
  dialog.showModal()
}

sortBtn.addEventListener("click", () => {

  let { comparations, changes } = quickSort(numbers, 0, numbers.length - 1);

  openModal({
    message: `Comparaciones ${comparations} y ${changes} intercambios`
  })
  fillCard(numbers);
  sortBtn.disabled = true
});

btnClose.addEventListener('click', () => {
  dialog.close()
})

shuffle.addEventListener("click", () => {

  fillNums(numbers)
  fillCard(numbers);
  sortBtn.disabled = false
});

