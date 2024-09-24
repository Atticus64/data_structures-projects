import "./style.css";

/**
 * @type {number[]}
 */
let numbers = [];
let comparations = 0;
let changes = 0;

const sortBtn = document.querySelector(".sort");

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

/**
 * @typedef Result
 * @property {number[]} data
 * @property {number} comparations
 * @property {number} changes
 */

/**
 * @return {Result}
 */
function test(items) {
  const length = items.length;
  let comparations = 0;
  let changes = 0;

  if (length <= 1) {
    return items;
  }
  const PIVOT = items[0];
  const GREATER = [];
  const LESSER = [];

  for (let i = 1; i < length; i++) {
    if (items[i] > PIVOT) {
      GREATER.push(items[i]);
    } else {
      LESSER.push(items[i]);
    }
  }

  const less = test(LESSER);
  const great = test(GREATER);

  const sorted = [...less, PIVOT, ...great];

  return sorted;
}

function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i] <= pivot && i <= high - 1) {
      i++;
    }

    while (arr[j] > pivot && j >= low + 1) {
      j--;
    }
    if (i < j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let temp = arr[low];
  arr[low] = arr[j];
  arr[j] = temp;

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
    let pivot = array[low];
    let i = low;
    let j = high;

    while (i < j) {
      while (array[i] <= pivot && i <= high - 1) {
        comparations += 1;
        i++;
      }

      while (array[j] > pivot && j >= low + 1) {
        comparations += 1;
        j--;
      }
      if (i < j) {
        swap(array, i, j);
      }
    }
    swap(array, low, j);

    quickSort(array, low, j - 1);
    quickSort(array, j + 1, high);

    return {
      comparations,
      changes,
    };
  }
}

sortBtn.addEventListener("click", () => {
  let { comparations, changes } = quickSort(numbers, 0, numbers.length - 1);

  fillCard(numbers);
});
