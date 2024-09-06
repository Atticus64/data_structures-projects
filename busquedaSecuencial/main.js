import './style.css'
import Error from './icons/Error.svg'
import Success from './icons/Success.svg'

const numbers = []
const form = document.querySelector(".searchForm")
const icon = document.querySelector(".icon")
const dialog = document.querySelector("dialog")
const okBtn = document.querySelector("button.okBtn")
let pos = -1


/**
 * 
 * @param {Array<number>} numbers 
 */
function createNumbers(numbers) {

  for (let i = 0; i < 200; i++) {
    numbers[i] = Math.floor(Math.random() * 10000)
  }
}

createNumbers(numbers)

document.querySelector('.card-nums').innerHTML = `
  ${numbers.map((n, i) => `<span class="num-${i}"> ${n}</span>`)}
  `


/**
 * @param {Array<number>} collection 
 * @param {number} value 
 */
function busquedaSecuencial(collection, value) {
  let iter = 0

  let delay = 200;
  for (let i = 0; i < collection.length; i++) {
    let numSelected = document.querySelector(`.num-${i}`)
    numSelected.style.backgroundColor = "cyan"
    if (collection[i] === value) {
      numSelected.style.backgroundColor = ""
      return {
        position: i,
        iterations: iter,
        is_error: false,
        elem: value
      }
    }
    setTimeout(() => {
      numSelected.style.backgroundColor = ""
    }, delay)
    delay += 10
    iter += 1
  }

  return {
    error: `No se encontro el elemento ${value}`,
    is_error: true,
    iterations: iter
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const old = document.querySelector(`.num-${pos}`)

  if (old !== null) {
    old.style.backgroundColor = ""
  }
  const { num } = Object.fromEntries(new FormData(e.target))
  const msgBox = document.querySelector("p.message")

  if (num === '') {
    return
  }
  
  let elem = Number(num)

  const result = busquedaSecuencial(numbers, elem)

  if (!result.is_error) {
     const { position, iterations } = result
    // alert(`El elemento ${elem} se encontro en la posición ${position} con ${iterations} iteraciones`)
    pos = position
    const element = document.querySelector(`.num-${position}`)
    element.style.backgroundColor = "darkorange"
    element.scrollIntoView()
    msgBox.textContent = `El dato esta en la posicion: ${position}
                          con ${iterations} iteraciones`

    icon.src = Success

  } else {
    msgBox.textContent = "No se encontro el elemento " + elem
    icon.src = Error


  }

  dialog.showModal()

})


okBtn.addEventListener('click', () => {
  dialog.close()
})