class Node<T> {
  value: T
  prev: Node<T> | null = null
  
  constructor(value: T, prev: Node<T> | null) {
    this.value = value
    this.prev = prev
  }
}

export class Stack<T> {
  #data: Node<T> | null = null
  constructor(elem?: T ) {
    if (!elem) {
      return
    }

    this.#data = new Node(elem, null)
  }

  push(n: T) {
    const newNode = new Node(n, this.#data)
    this.#data = newNode
  }
  
  peek() {
    if (this.#data === null) return

    return this.#data.value
  }
  
  pop() {
    if (this.#data === null) return
    
    if (this.#data.value === null) {
      throw Error('No value in stack')
    }
    
    if (this.#data.prev === null) {
      const last = this.#data.value
      this.#data = null
      return last
    }
    
    const prev = this.#data.prev
    const ultimate = this.#data.value
    this.#data = prev
    return ultimate
  }

  size() {
    let count = 0
    let head: Node<T> | null = this.#data
    while(head !== null) {
      head = head.prev 
      count += 1
    }

    return count
  }

  *iter() {
    if (!this.#data) return

    let head: Node<T> | null = this.#data

    while(head !== null) {
      yield head.value
      head = head.prev 
    }
  }
  

  debug() {
    console.log(this.#data)
  }
}

 