import { Articulo, CargaArticulo, cargarArticulos } from './articulo';
import { readFile } from './file';
import './style.css';
import { insertTable } from './table';

export const articulos: Articulo[] = [];
export const carga = new Map<string, CargaArticulo>();
const dropBox = document.querySelector('.dropzone-container');
const fileInput: HTMLInputElement | null =
	document.querySelector('#dropzone-file');
let counter = 0;

fileInput?.addEventListener('change', (_) => {
	if (!fileInput.files || !dropBox) return;

	if (fileInput?.files.length === 1) {
		readFile(fileInput.files[0]);
	}
});

dropBox?.addEventListener('dragenter', (ev) => {
	ev.preventDefault();
	ev.stopImmediatePropagation();
	counter++;
	dropBox.querySelector('.dropzone-label')?.classList.add('dragenter');
});

dropBox?.addEventListener('dragleave', (ev) => {
	ev.preventDefault();
	counter--;
	ev.stopImmediatePropagation();
	if (counter === 0) {
		dropBox.querySelector('.dropzone-label')?.classList.remove('dragenter');
	}
});

dropBox?.addEventListener('dragover', (ev) => {
	if (ev instanceof DragEvent) {
		if (!ev.dataTransfer) return;

		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'copy';
	}
});

dropBox?.addEventListener('drop', (ev) => {
	if (ev instanceof DragEvent) {
		dropBox.querySelector('.dropzone-label')?.classList.remove('dragenter');
		ev.preventDefault();

		if (!ev.dataTransfer) return;

		const file = ev.dataTransfer.files[0];
		readFile(file);
		insertTable(carga);
	}
});

(async () => {
	await cargarArticulos();
})();
