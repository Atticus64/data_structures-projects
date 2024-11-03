import './style.css'
import { Tree } from './tree';

const container = document.querySelector('.tree-container');
const form: HTMLFormElement | null = document.querySelector('#tree-menu');
const arbol = new Tree<string | number>();

const ACTIONS = {
  INSERT: "insert",
  DELETE: "delete",
  SEARCH: "search",
  INORDEN: "inorden",
  PREORDEN: "preorden",
  POSTORDEN: "postorden"
};

//arbol.insert(5);
//arbol.insert(15);
//arbol.insert(11);
//arbol.insert(2);
//arbol.insert(7);
//arbol.insert(99);

if (container) {
  const html = arbol.generateTreeHtml();
  container.innerHTML = html;
}

const parse = (input: FormData) => {
  const data: string = input.get("data") as string ?? "none"
  const command: string = input.get("command") as string ?? "none"
  return {
    data,
    command
  }
}

function isNumber(data: string) {
    return !isNaN(parseInt(data))
}

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function execute(action: string, arg?: string) {

  let argument: string | number;
  switch (action) {
    case ACTIONS.INSERT:
      if (!arg) return null;
      argument = isNumber(arg) ? parseInt(arg) : arg

      arbol.insert(argument)
      return null
    case ACTIONS.DELETE:
      if (!arg) return null;
      argument = isNumber(arg) ? parseInt(arg) : arg

      arbol.remove(argument)
      return null
    case ACTIONS.SEARCH:
      return null
    case ACTIONS.INORDEN:
      const inorden = arbol.inorder()
      await draw(inorden, "Inorden")
      return inorden
    case ACTIONS.PREORDEN:
      const preorden = arbol.preorden()
      await draw(preorden, "Preorden")
      return preorden
    case ACTIONS.POSTORDEN:
      const postorden = arbol.postorden()
      await  draw(postorden, "PostOrden")
      return postorden
    default: 
      return null
  }
}

async function draw(items: (string|number)[], tag: string) {

    const result = document.querySelector(".result")
    if(!result) return
    result.innerHTML = `${tag}: [`
    for (let index = 0; index < items.length; index++ ) {
        const node = items[index]
        const elem: HTMLDivElement | null = document.querySelector(`div.node-${node}`)
        if (!elem) continue;

        elem.classList.add('pointer')
        if (node === items.at(-1)) {
            result.innerHTML += `${node}]`
        } else {
            result.innerHTML += `${node}, `
        }
        await timer(500)
        elem.classList.remove('pointer')
    }
}


form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const input = parse(formData);
  await execute(input.command, input.data)
  const html = arbol.generateTreeHtml();
  if (container) {

    container.innerHTML = html;
  }
})