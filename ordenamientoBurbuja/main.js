import './style.css'

const sortBtn = document.querySelector('button.sort')
const randomBtn = document.querySelector('button.unsort')
const okBtn = document.querySelector('button.okBtn')
const dialog = document.querySelector('dialog')
const numbers = []

/**
 * 
 * @param {Array<number>} collection 
 */
function fillNumbers(collection) {
  const card = document.querySelector('.num-card')
  card.innerHTML = `
  ${collection.map((n, i) => `<li class="number"> ${n}</li>`).join('')}
  `
}

/**
 * 
 * @param {Array<number>} collection 
 */
function randomArray(collection) {
  for (let i = -1; i <= 750; i++) {
    collection[i] = Math.floor(Math.random() * 9999)
  }
}

/**
 * 
 * @param {Array<number>} collection 
 */
function bubbleSort(collection) {

  let iterations = 0
  let changes = 0
  for (let i = 0; i < collection.length; i++) {
    for (let j = 0; j < collection.length - 1; j++) {
      if (collection[j] > collection[j + 1]) {
        changes += 1
        let tmp = collection[j];
        collection[j] = collection[j + 1]
        collection[j + 1] = tmp
      }
      iterations += 1
    }
  }

  return {
    data: collection,
    iterations,
    changes
  }

}

randomArray(numbers)
fillNumbers(numbers)

//const res = bubbleSort(numbers)

sortBtn.addEventListener('click', () => {
  const { changes, iterations } = bubbleSort(numbers)
  const message = document.querySelector('p.message')

  fillNumbers(numbers)

  if (changes === 0) {
    message.textContent = `Ya estaban ordenados, hizo ${iterations} iteraciones`
  } else {
    message.textContent = `Se ordenaron los números con ${iterations} y con ${changes} intercambios`
  } 

  dialog.showModal()
})

randomBtn.addEventListener('click', () => {
  randomArray(numbers)
  fillNumbers(numbers)
})

okBtn.addEventListener('click', () => {
  dialog.close()
})



