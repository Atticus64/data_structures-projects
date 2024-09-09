export default class Beneficiario {

  //define a type
  /**
   * @typedef InitialValues
   * @property {string} curp 
   * @property {string} ap1 
   * @property {string} ap2 
   * @property {string} name 
   */
  
  /**
   * 
   * @param {InitialValues} values 
   */
  constructor({ curp, ap1, ap2, name }) {
    this.curp = curp
    this.apellido1 = ap1
    this.apellido2 = ap2
    this.nombre = name
  }

  /**
   * @param {string} clave
   */
  set benefClave(clave) {
    this.clave = clave
  }

  /**
   * @param {string} fecha
   */
  set fechaEnt(fecha) {
    this.fechaEntrega = fecha
  } 

  /**
   * @param {string} folio
   */
  set folioEnt(folio) {
    this.folioEntrega = folio
  }

  /**
   * @param {number} grado
   */
  set benefGrado(grado) {
    this.grado = grado
  }

  /**
   * @param {string} nivel
   */
  set benefNivel(nivel) {
    this.nivel = nivel
  }


  
}
