import { articulos } from "./main";

export class Articulo {
  clave = ""
  nombre = ""

  constructor(id: string, nameArticle: string) {
    this.clave = id
    this.nombre = nameArticle
  }
}

export async function cargarArticulos() {
	const file = await fetch('./articulos.txt');
	const text = await file.text();
	let lines = text.split('\n');
	lines = lines.splice(1, lines.length);
	for (const line of lines) {
		const [id, name] = line.split('\t');
		const art = new Articulo(id, name);
		articulos.push(art);
	}

  sortArticulos(articulos, 0, articulos.length -1)
}

export function searchArticulo(articulos: Articulo[], clave: string) {

  let inf = 0
  let sup = articulos.length - 1
  let mid = 0
  let found = false
  let articulo = null

  while (inf <= sup && !found) {
    mid = Math.floor((inf + sup) / 2)

    if (articulos[mid].clave === clave) {
      found = true
      articulo = articulos[mid]
      break
    }

    if (clave < articulos[mid].clave) {
      sup = mid - 1
    } else {
      inf = mid + 1
    }
  }

  return articulo
}

export function sortArticulos(articulos: Articulo[], low: number, high: number) {
  if (low < high) {
    const part = partition(articulos, low, high)
    
    sortArticulos(articulos, low, part - 1);
    sortArticulos(articulos, part + 1, high);

  }
}

function partition(arr: Articulo[], low: number, high: number) {
  const pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i].clave <= pivot.clave && i <= high - 1) {
      i++;
    }

    while (arr[j].clave > pivot.clave && j >= low + 1) {
      j--;
    }
    if (i < j) {
      swap(arr, i, j);
    }
  }
  swap(arr, low, j);

  return j;
}

function swap(array: Articulo[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export interface CargaArticulo {
  nCajas: number 
  nombre: string
  peso: number 
}
