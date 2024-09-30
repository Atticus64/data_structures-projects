import { CargaArticulo } from "./articulo";

const container: HTMLElement | null =
	document.querySelector('.table-container');
const table = document.querySelector('.products-table');

function getCells(data: string[], type: string) {
	return data.map((cell) => `<${type}>${cell}</${type}>`).join('');
}

function createBody(data: Map<string, CargaArticulo>) {
	//return data.forEachb(benef => `<tr>${getProps(benef, 'td')}</tr>`).join('');
	const iterable = data.entries();
	let html = '';

	for (const [id, carga] of iterable) {
		html += `<tr>
    <td> ${carga.nCajas} </td>
    <td> ${id} </td>
    <td> ${carga.nombre} </td>
    <td> ${carga.peso.toFixed(3)} </td>
    </tr>`;
	}

	return html;
}

function createTable(items: Map<string, CargaArticulo>) {
	const titles = ['Cajas', 'Código', 'Producto', 'Kilos'];

	return `
      <thead>${getCells(titles, 'th')}</thead>
      <tbody>${createBody(items)}</tbody>
  `;
}

export function insertTable(carga: Map<string, CargaArticulo>) {
	if (!container || !table) return;
	const content = createTable(carga);
	table.innerHTML = '';

	container.style.visibility = 'visible';
	table.innerHTML = content;
}