import './style.css'
import { Wrapper } from './result.js'
const numbers = []

for (let i = 1; i <= 7500 * 4; i++) {
  if (i % 4 === 0) {
    numbers.push(i)
  }
}

document.querySelector('.numbers-card').innerHTML = `
  ${numbers.map((n, i) => `<span class="num-${i}"> ${n}</span>`)}
`

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')

/**
 * 
 * @param {Array<number>} collection 
 * @param {number} value 
 * @returns {Wrapper}
 */
function binarySearch(collection, value) {

  let inf = 0
  let sup = collection.length - 1
  let mid = 0
  let found = false
  let num = null
  let iterations = 0
  const result = new Wrapper()

  while (inf <= sup && !found) {
    mid = Math.floor((inf + sup) / 2)

    if (numbers[mid] == value) {
      found = true
      num = numbers[mid]
      result.setValue({
        position: mid,
        iterations,
        data: num
      })
      break
    }

    if (value < numbers[mid]) {
      sup = mid - 1
    } else {
      inf = mid + 1
    }
    iterations += 1
  }

  if (!found) {
    result.setIsError(true)
    result.setValue({
      error: `No se encontro el valor ${value}`,
      iterations,
      data: value
    })
  }

  return result

}

const dialog = document.querySelector('dialog')
const btClose = document.querySelector('.modal-close')
const inc = document.querySelector("button.plus")
const dec = document.querySelector("button.minus")
const numSearch = document.querySelector("#numSearch")
let pos = -1

inc.addEventListener('click', () => {
  numSearch.value = Number(numSearch.value) + 1

})

dec.addEventListener('click', () => {

  numSearch.value = Number(numSearch.value) - 1
})

btClose.addEventListener('click', () => {
  dialog.close()
})

form.addEventListener('submit', (e) => {

  const old = document.querySelector(`.num-${pos}`)

  if (old !== null) {
    old.style.backgroundColor = ""
  }

  e.preventDefault()

  const data = Object.fromEntries(new FormData(e.target))
  const num = Number(data.number)
  const msgBox = document.querySelector("p.message")

  let searchData = binarySearch(numbers, num)

  if (searchData.isError()) {
    const { error } = searchData.unwrap()
    msgBox.textContent = error
  } else {
    const { iterations, position } = searchData.unwrap()
    const elem = document.querySelector(`.num-${position}`)
    elem.style.backgroundColor = "darkorange"

    const myCanvas = document.querySelector('.canvas');

    var myConfetti = confetti.create(myCanvas, { resize: true });

    myConfetti();

    elem.scrollIntoView()
    pos = position

    msgBox.textContent = `El dato esta en la posicion: ${position}
                          con ${iterations} iteraciones`
  }
  dialog.showModal()


})


