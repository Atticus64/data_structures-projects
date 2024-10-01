import { CargaArticulo } from "./articulo";

const container: HTMLElement | null =
	document.querySelector('.table-container');
const table = document.querySelector('.products-table');

function getCells(data: string[], type: string) {
	return data.map((cell) => `<${type}>${cell}</${type}>`).join('');
}

function createBody(data: Map<string, CargaArticulo>) {
	const iterable = data.entries();
	let html = '';
  let totalCajas = 0
  let totalKilos = 0

	for (const [id, carga] of iterable) {
    totalCajas += carga.nCajas
    totalKilos += carga.peso
		html += `<tr>
    <td> ${id} </td>
    <td> ${carga.nCajas} </td>
    <td> ${carga.nombre} </td>
    <td> ${carga.peso.toFixed(2)} </td>
    </tr>`;
	}

  html += `
    <tr>
      <td> <b> Total Cajas </b> </td>
      <td> ${totalCajas} </td>
      <td> <b> Total Kilos </b> </td>
      <td> ${totalKilos.toFixed(2)} </td>
    </tr>
  `

	return html;
}

function createTable(items: Map<string, CargaArticulo>) {
	const titles = ['Código', 'Cajas', 'Producto', 'Kilos'];

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