
export class User {

  constructor(id, name) {
    this.id = id
    this.name = name
  }

  /**
   * @param {string} input
   */
  setEmail(input) {
    this.email = input
  }

  /**
   * @param {string} input
   */
  setPhone(input) {
    this.phone = input
  }

  /**
  * @param {number} input
  */
  setAge(input) {
    this.age = input
  }

  /**
    * @param {string} input
    */
  setDate(input) {
    this.date = new Date(input)
  }


  getHour() {
    return this.date.toLocaleString(
      'es',{
        timeStyle: 'short',
        hour12: false,
        timeZone: 'UTC'
      })
  }
}