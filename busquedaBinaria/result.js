
export class Wrapper {
  #value = null
  #is_error = false
  is_object = false 

  constructor(initialV = null) {
    this.#value = initialV
    this.is_object = this.#value !== null 
  }

  setValue(v) {
    this.#value = v
    this.is_object = v !== null
  }

  setIsError(state) {
    this.#is_error = state 
  }

  unwrap() {
    return this.#value
  }

  isOk() {
    return !this.#is_error
  }

  isError() {
    return this.#is_error
  }

  isNone() {
    return !this.is_object
  }
}