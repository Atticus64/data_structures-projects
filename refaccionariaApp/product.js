export class Product {
  codigo = '00000000'
  descripcion = ''
  precioUnitario = 0
  piezas = 0
  importe = 0

  /**
   *
   * @param {string} cod
   * @param {number} prec
   * @param {string} desc
   * @param {number} piezas
   */
  constructor (cod, prec, desc, piezas) {
    this.codigo = cod
    this.descripcion = desc
    this.precioUnitario = prec
    this.piezas = piezas
    this.importe = this.precioUnitario * this.piezas
  }
}
