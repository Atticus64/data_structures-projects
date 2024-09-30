import { searchArticulo } from "./articulo"
import { createBox } from "./box"
import { articulos, carga } from "./main"
import { insertTable } from "./table"

export function parseFile(data: string) {
  const lines = data.split("\n")

  for (const line of lines) {
    if (line.length <= 0) continue

    const box = createBox(line)
    if (carga.has(box.codeProduct)) {
      const curr = carga.get(box.codeProduct)
      if (!curr) return

      carga.delete(box.codeProduct)

      carga.set(box.codeProduct, {
        nCajas: curr.nCajas + 1,
        nombre: curr.nombre,
        peso: curr.peso + box.peso
      })
    } else {

      const art = searchArticulo(articulos, box.codeProduct)
      if (!art) return

      carga.set(box.codeProduct, {
        nCajas: 1,
        nombre: art.nombre,
        peso: box.peso
      })

    }

    
  }

  return carga
}

export function readFile(file: File) {
	const reader = new FileReader();
  carga.clear()

	reader.addEventListener('load', (event) => {
		if (!event.target) return;
		// content of file
		const result = event.target.result;
    if (!result) return
    const data = parseFile(result.toString())
    if(!data) return

    insertTable(data)
	});

	reader.readAsText(file, 'utf-8');
}