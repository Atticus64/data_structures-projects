import './style.css'
import Beneficiario from './beneficiario'
import { isValidCurp } from './validation'
import { toast } from 'https://cdn.skypack.dev/wc-toast';

const form = document.querySelector(".search-form")
let beneficiarios = []
;(async () => {
  beneficiarios = await getBeneficiarios()
})()
const dialog = document.querySelector("dialog")
const okBtn = document.querySelector(".okBtn")

async function getBeneficiarios() {

  const resp = await fetch("./data.csv")

  const text = await resp.text()

  const listaRawBenefi = text.split("\n")
  listaRawBenefi.splice(0, 3)
  /**
   * @type {Array<Beneficiario>}
   */
  const beneficiarios = []

  for (const alum of listaRawBenefi) {
    const data = alum.split(",")

    if (data[0] === '') continue

    let benef = new Beneficiario({
      curp: data[0],
      ap1: data[1],
      ap2: data[2],
      name: data[3]
    })

    benef.benefClave = data[4]
    benef.fechaEnt = data[5]
    benef.folioEnt = data[6]
    benef.benefGrado = data[7]
    benef.benefNivel = data[8]

    beneficiarios.push(benef)
  }


  return beneficiarios
}

/**
 * 
 * @param {Beneficiario[]} collection 
 * @param {string} curp 
 */
function buscarPorCurp(collection, curp) {

  let inf = 0
  let sup = collection.length - 1
  let mid = 0
  let iterations = 0
  let found = false
  let benef = null
  let position = -1

  while (inf <= sup && !found) {
    mid = Math.floor((inf + sup) / 2)

    if (collection[mid].curp === curp) {
      found = true
      benef = collection[mid]
      position = mid
      break
    }

    if (curp < collection[mid].curp) {
      sup = mid - 1
    } else {
      inf = mid + 1
    }

    iterations += 1
  }


  let message = `No se encontro el valor ${curp} tuvo ${iterations} iteraciones`
  let is_error = true
  if (found) {
    is_error = false
    message = `Encontrado con exito en la posición ${position} con ${iterations} iteraciones`
  }

  return {
    message,
    is_error,
    data: benef,
    index: position,
    iterations
  }

}


function getCells(data, type) {
  return data.map(cell => `<${type}>${cell}</${type}>`).join('');
}

function getProps(data, type) {
  const colData = Object.keys(data).map(function (key) {
    return data[key];
  });

  return colData.map(cell => {
    return `<${type}>${cell}</${type}>`
  }).join('')
}


/**
 * 
 * @param {Beneficiario[]} data  
 */
function createBody(data) {
  return data.map(benef => `<tr>${getProps(benef, 'td')}</tr>`).join('');
}

function createTable(items) {

  // Destructure the headings (first row) from
  // all the rows

  const titles = ["CURP", "APELLIDO 1", "APELLIDO 2", "NOMBRE", "CLAVE", "FECHA ENTREGA", "FOLIO ENTREGA", "GRADO", "NIVEL EDUCATIVO"]
  // Return some HTML that uses `getCells` to create
  // some headings, but also to create the rows
  // in the tbody.
  return `
      <thead>${getCells(titles, 'th')}</thead>
      <tbody>${createBody(items)}</tbody>
  `;
}

let page = 1

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const { curp } = Object.fromEntries(new FormData(e.target))
  const validation = isValidCurp(curp)

  if (!validation.ok) {
    toast.error(`Curp invalida: ${validation.error}`);
    return
  }

  const busqueda = buscarPorCurp(beneficiarios, curp)
  const container = document.querySelector(".table-container")
  const table = document.querySelector(".alum-tabla")

  if (busqueda.is_error) {
    dialog.querySelector("p.message").textContent = `No se encontro la curp: ${curp}`
    dialog.showModal()
  } else {
    toast.success('Curp coincide con un Alumno')

    const content = createTable([busqueda.data])
    container.style.visibility = "visible"

    table.innerHTML = content
  }
})

okBtn.addEventListener('click', (e) => {
  dialog.close()
})
