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
const dialog = document.querySelector('dialog')
const btClose = document.querySelector('.modal-close')
const msgBox = document.querySelector("p.message")
const inc = document.querySelector("button.plus")
const dec = document.querySelector("button.minus")
const numSearch = document.querySelector("#numSearch")
const STATUS = {
  Ok: "success",
  Err: "error"
}
let pos = -1

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
      error: `No se encontro el valor ${value} tuvo ${iterations} iteraciones`,
      iterations,
      data: value
    })
  }

  return result

}


inc.addEventListener('click', () => {
  numSearch.value = Number(numSearch.value) + 1

})

dec.addEventListener('click', () => {

  numSearch.value = Number(numSearch.value) - 1
})

btClose.addEventListener('click', () => {
  dialog.close()
})

function openModal({ message, status }) {
  msgBox.textContent = message
  if (status === STATUS.Ok) {
   const myCanvas = document.querySelector('.canvas');

    var myConfetti = confetti.create(myCanvas, { resize: true });

    myConfetti();
  } else if (status === STATUS.Err) {

  }

  dialog.showModal()
}

form.addEventListener('submit', (e) => {

  const old = document.querySelector(`.num-${pos}`)

  if (old !== null) {
    old.style.backgroundColor = ""
  }

  e.preventDefault()

  const data = Object.fromEntries(new FormData(e.target))

  const num = Number(data.number)
  if (num < numbers[0]) {
    openModal({
      message: "Ese numero es menor al primer dato, ingresar otro",
      status: STATUS.Err
    })
    return
  }


  let searchData = binarySearch(numbers, num)

  if (searchData.isError()) {
    const { error } = searchData.unwrap()
    openModal({ 
      message: error,
      status: STATUS.Err 
    }) 

  } else {
    const { iterations, position } = searchData.unwrap()
    const elem = document.querySelector(`.num-${position}`)
    elem.style.backgroundColor = "darkorange"


    elem.scrollIntoView()
    pos = position
    openModal({ 
      message: `El dato esta en la posicion: ${position} con ${iterations} iteraciones`,
      status: STATUS.Ok 
    }) 
  }
  dialog.showModal()


})


