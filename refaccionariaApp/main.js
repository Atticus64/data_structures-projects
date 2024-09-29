import './style.css'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import { Product } from './product.js'

/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector('.form_inventario')
const btnSort = document.querySelector('button.sort')
const modeOrdenamiento = document.querySelector('#modeOrd')
const table = document.querySelector('.products-table')
const inputQuery = document.querySelector('input#query')
const tableContainer = document.querySelector('.table-container')
const searchBtn = document.querySelector('button.search')
/**
 * @type {Product[]}
 */
const products = []

/**
 * @typedef StateValidation
 * @property {boolean} isInvalid
 * @property {string | null} error
 */

function isNumber (str) {
  return !/\D/.test(str)
}

/**
 *
 * @param {Product} product
 * @returns {StateValidation}
 */
function invalidProduct (product) {
  const desc = product.descripcion
  const codigo = product.codigo
  const precio = Number(product.precioUnitario)
  const piezas = Number(product.piezas)
  if (!desc || desc.length === 0 || desc.trim() === '' || desc.trim() === '\n') {
    return {
      isInvalid: true,
      error: 'Descripcion invalida'
    }
  }

  if (precio <= 0 || !precio) {
    return {
      isInvalid: true,
      error: 'Precio invalido'
    }
  }

  if (piezas <= 0 || piezas === undefined) {
    return {
      isInvalid: true,
      error: 'No. de Piezas invalido'
    }
  }

  if (!isNumber(codigo) || codigo === undefined) {
    return {
      isInvalid: true,
      error: 'Codigo de producto invalido'
    }
  }

  if (codigo.length < 8) {
    product.codigo = codigo.padStart(8, '0')
  }

  return {
    isInvalid: false,
    error: null
  }
}

/**
 *
 * @param {Product[]} products
 * @param {keyof Product} criteria
 */
function insertSortProducts (products, criteria) {
  let j = 0
  let index = 0
  const length = products.length

  for (let i = 0; i < length; i++) {
    index = products[i]
    j = i - 1
    while (j >= 0 && products[j][criteria] > index[criteria]) {
      products[j + 1] = products[j]
      j = j - 1
    }
    products[j + 1] = index
  }
}

/**
 *
 * @param {Product[]} products
 * @param {string} query
 */
function searchProductsByDesc (products, query) {
  const items = []

  for (const prod of products) {
    const desc = prod.descripcion.toLowerCase()
    if (desc.includes(query.toLowerCase())) {
      items.push(prod)
    }
  }

  return items
}

function getCells (data, type) {
  return data.map(cell => `<${type}>${cell}</${type}>`).join('')
}

function getProps (data, type) {
  const colData = Object.keys(data).map(function (key) {
    return data[key]
  })
  let result = ''

  for (let i = 0; i < colData.length; i++) {
    if (i === colData.length - 1 || i === 2) {
      result += `<${type}> $ ${colData[i]}</${type}>`
    } else {
      result += `<${type}>${colData[i]}</${type}>`
    }
  }

  return result
}

/**
 *
 * @param {Product[]} products
 */
function getTotals (products) {
  let count = 0
  let totalPrice = 0

  for (const prod of products) {
    count += prod.piezas
    totalPrice += prod.importe
  }

  return {
    count,
    totalPrice
  }
}

/**
 *
 * @param {Product[]} data
 */
function createBody (data) {
  let content = data.map(benef => `<tr>${getProps(benef, 'td')}</tr>`).join('')

  const totals = getTotals(data)
  content += `
    <tr>
      <td></td>
      <td></td>
      <td>Total</td>
      <td>${totals.count}</td>
      <td> $ ${totals.totalPrice}</td>
    </tr>
  `

  return content
}

/**
 *
 * @param {Product[]} items
 * @returns {string}
 */
function createTable (items) {
  const titles = ['Código', 'Descripción', 'Venta Unit', 'Piezas Vendidas', '$ Importe']
  // Return some HTML that uses `getCells` to create
  // some headings, but also to create the rows
  // in the tbody.
  return `
      <thead>${getCells(titles, 'th')}</thead>
      <tbody>${createBody(items)}</tbody>
  `
}

/**
 *
 * @param {string} query
 */
function searchAndShow (query) {
  if (query === null || query.trim() === '' || query.trim() === '\n') {
    toast.error('Busqueda invalida')
    return
  }

  const data = searchProductsByDesc(products, query)
  const content = createTable(data)
  tableContainer.style.visibility = 'visible'
  table.innerHTML = content
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  /**
   * @type {Product}
   */
  const data = Object.fromEntries(new FormData(e.target))
  const { isInvalid, error } = invalidProduct(data)
  if (isInvalid) {
    toast.error(`Producto invalido: ${error}`)
    return
  }

  toast.success('Producto capturado')
  const prod = new Product(
    data.codigo.trim(),
    Number(data.precioUnitario),
    data.descripcion.trim(),
    Number(data.piezas)
  )

  products.push(prod)

  form.reset()
})

btnSort.addEventListener('click', () => {
  if (products.length <= 0) {
    toast('⚠ No hay suficientes datos')
    return
  }

  const mode = modeOrdenamiento.options[modeOrdenamiento.selectedIndex].value
  insertSortProducts(products, mode)
  const content = createTable(products)
  tableContainer.style.visibility = 'visible'
  table.innerHTML = content
})

inputQuery.addEventListener('keyup', function (event) {
  if (products.length <= 0) {
    toast('⚠ No hay suficientes datos')
    return
  }

  if (event.key === 'Enter') {
    const query = inputQuery.value
    searchAndShow(query)
  }
})

searchBtn.addEventListener('click', () => {
  if (products.length <= 0) {
    toast.warning('No hay suficientes datos')
    return
  }

  const query = inputQuery.value

  searchAndShow(query)
})
