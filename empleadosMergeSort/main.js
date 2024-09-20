import './style.css'
import { User } from './user';

const list1 = document.querySelector(".l1")
const list2 = document.querySelector(".l2")
const listord = document.querySelector(".lorder")
const ordNums = document.querySelector("button.orderN")
const shuffleNums = document.querySelector("button.caos")
const emplFirst = document.querySelector("button.emplFirst")
const emplLast = document.querySelector("button.emplLast")
const usersCont = document.querySelector(".users-cards")
let need_order = false
/**
 * @type {Array<User}
 */
let users = []

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const impairs = []
const pairs = []

for (let i = 1; i <= 1000; i++) {
  if (i % 2 === 0) {
    pairs.push(i)
  } else {
    impairs.push(i)
  }
}

/**
 * 
 * @param {Array<T>} collection 
 */
function insertSort(collection) {
  let j = 0
  let index = 0
  let compares = 0
  let changes = 0
  let length = collection.length

  for (let i = 0; i < length; i++) {
    index = collection[i]
    j = i - 1
    compares += 1
    while (j >= 0 && collection[j] > index) {
      changes += 1
      collection[j + 1] = collection[j]
      j = j - 1
    }
    collection[j + 1] = index
  }
}
/**
 * 
 * @param {Array<number>} collection1 
 * @param {Array<number>} collection2 
 */
function merge(collection1, collection2) {
  let i = 0
  let j = 0
  const results = []

  while (i < collection1.length && j < collection2.length) {
    if (collection1[i] < collection2[j]) {
      results.push(collection1[i])
      i++
    } else {
      results.push(collection2[j])
      j++
    }
  }


  return results.concat(collection1.slice(i), collection2.slice(j))
}

/**
 * 
 * @param {User[]} collection 
 */
function insertSortUser(collection) {
  let j = 0
  let index = null;
  let compares = 0
  let changes = 0
  let length = collection.length

  for (let i = 0; i < length; i++) {
    index = collection[i]
    j = i - 1
    compares += 1
    while (j >= 0 && collection[j].date.getTime() > index.date.getTime()) {
      changes += 1
      collection[j + 1] = collection[j]
      j = j - 1
    }
    collection[j + 1] = index
  }
}

/**
 * 
 * @param {User[]} collection1
 * @param {User[]} collection2
 */
function mergeUsers(collection1, collection2) {
  let i = 0
  let j = 0
  const results = []

  while (i < collection1.length && j < collection2.length) {
    if (collection1[i].date.getTime() < collection2[j].date.getTime()) {
      results.push(collection1[i])
      i++
    } else {
      results.push(collection2[j])
      j++
    }
  }
  
  return results.concat(collection1.slice(i), collection2.slice(j))

}

function usersMergeSort(list) {
  const listHalf = Math.floor(list.length / 2)
  const subList1 = list.slice(0, listHalf)
  const subList2 = list.slice(listHalf, list.length)

  insertSortUser(subList1)
  insertSortUser(subList2)
  return merge(subList1, subList2)

}

async function getUsers() {
  const response = await fetch('./shuffleUsers.csv')
  const text = await response.text()

  let lines = text.split("\n")
  let users = []

  lines = lines.slice(1, lines.length - 1)
  for (const line of lines) {
    const item = line.split(",")
    const user = new User(item[0], item[1])
    user.setEmail(item[2])
    user.setAge(item[3])
    user.setPhone(item[4])
    user.setDate(item[5])
    users.push(user)
  }

  users = usersMergeSort(users)

  return users
}

/**
 * 
 * @param {User} user 
 */
function createCard(user) {
  const content =
    `<div class="card">
          <h2>
            <span class="name">${user.name}</span>
          </h2>
          <section class="descriptions">
            <p><b>Age:</b> ${user.age}</p>
            <p>
            <b> Telefono: </b> <span> ${user.phone}</span>
            </p>
            <p>
            <b>Llegada:</b> <span> ${user.getHour()} am</span>
            </p>
            <p>
              <b>Email: </b> ${user.email}
            </p>
          </section>
        </div>
        `

  return content
}

; (async () => {
  users = await getUsers()


})()

shuffleArray(pairs)
shuffleArray(impairs)

list1.innerHTML = `${pairs.map(e => `<li> ${e}</li>`)}`
list2.innerHTML = `${impairs.map(e => `<li> ${e}</li>`)}`

ordNums.addEventListener('click', () => {
  insertSort(pairs)
  insertSort(impairs)
  list1.innerHTML = `${pairs.map(e => `<li> ${e}</li>`)}`
  list2.innerHTML = `${impairs.map(e => `<li> ${e}</li>`)}`

  const ordered = merge(pairs, impairs)
  need_order = false
  emplFirst.disabled = need_order
  emplLast.disabled = need_order


  listord.innerHTML = `${ordered.map(e => `<li> ${e}</li>`)}`


})

shuffleNums.addEventListener('click', () => {
  shuffleArray(pairs)
  shuffleArray(impairs)

  list1.innerHTML = `${pairs.map(e => `<li> ${e}</li>`)}`
  list2.innerHTML = `${impairs.map(e => `<li> ${e}</li>`)}`

  need_order = true
  emplFirst.disabled = need_order
  emplLast.disabled = need_order
  listord.innerHTML = ''
  usersCont.innerHTML = ''
})


emplFirst.addEventListener('click', () => {
  const data = []

  for (let i = 0; i < 10; i++) {
    data.push(users[i])
  }

  usersCont.innerHTML = `${data.map(u => createCard(u)).join('')}`
})

emplLast.addEventListener('click', () => {
  const data = []

  for (let i = users.length - 1; i > users.length - 11; i--) {
    data.push(users[i])
  }

  data.reverse()

  usersCont.innerHTML = `${data.map(u => createCard(u)).join('')}`

})