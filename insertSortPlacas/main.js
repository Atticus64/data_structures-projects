import './style.css'

// NOTE: se quitan las letras Q, I, O
// porque se confunden con los numeros 1, 0
const abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const placas = []
const sortBtn = document.querySelector(".sort")
const unsortBtn = document.querySelector(".unsort")
const dialog = document.querySelector('dialog')
const msg = dialog.querySelector('.message')
const closeBtn = dialog.querySelector('.close')
const okBtn = dialog.querySelector('.ok')

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function crearPlaca() {
  let letters = []
  letters[0] = "V" 
  letters[1] = abecedario[randomNumber(5, 16)] 
  letters[2] = abecedario[randomNumber(0, 23)] 

  return `${letters.join('')}-${randomNumber(1111, 9999)}`
}

function fillPlacas(collection) {
  for (let i = 0; i < 1500; i++) {
    collection[i] = crearPlaca()
  }
}

/**
 * 
 * @param {Array<T>} collection 
 */
function fillCard(collection) {

  const card = document.querySelector('.placas-card')
  card.innerHTML = `
    ${collection.map((n, i) => `<li class="placa"> ${n}</li>`).join('')}
  `
}

/**
 * 
 * @param {Array<T>} collection 
 */
function insertSort(collection) {
  let j = 0
  let index = 0
  let compares = 0
  let changes = 0
  let length = collection.length

  for (let i = 0; i < length; i++) {
    index = collection[i]
    j = i - 1
    compares += 1
    while ( j >= 0 && collection[j] > index) {
      changes += 1
      collection[j + 1] = collection[j]
      j = j - 1
    }
    collection[j + 1] = index
  }

  return {
    changes, 
    compares
  }
}


sortBtn.addEventListener('click', () => {
  const {changes, compares} = insertSort(placas)
  msg.textContent = `Se ordeno con ${changes} intercambios y ${compares} comparaciones`

  dialog.showModal()

  fillCard(placas)
})

unsortBtn.addEventListener('click', () => {
  fillPlacas(placas)
  fillCard(placas)

})

closeBtn.addEventListener('click', () => {
  dialog.close()
})

okBtn.addEventListener('click', () => {
  dialog.close()
})
fillPlacas(placas)
fillCard(placas)
