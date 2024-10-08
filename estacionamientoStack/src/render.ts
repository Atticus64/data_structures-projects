import { toast } from "wc-toast";
import { Estacionamiento } from "./main";
import { Stack } from "./stack";
import { Vehiculo } from "./vehiculo";

const MAX = 20;

const remainingSpaces = document.querySelector("p.size");
export function playSoundError(message: string) {
	toast.error(message);
	const snd = new Audio("Microsoft_XP_Error.wav");
	snd.play();
}

const isMaxStack = (count: number) => (count - Estacionamiento.size()) === 0

export function overflowStack() {
  return isMaxStack(MAX)
}


export function updateMessageRemaining() {
	if (!remainingSpaces) return;

	const remaining = MAX - Estacionamiento.size();
	if (remaining <= 0) {
		remainingSpaces.textContent = "No hay campos disponibles";
	} else {
		remainingSpaces.textContent = `Campos disponibles ${remaining}`;
	}

  const items = document.querySelector('.stack-items')
  if (!items) return

  items.textContent = `
    <li>Vacío</li>
  `
}

export function getRandomColor() {

  
	const colors = [
		"#ffd7d5", // Rosa suave
		"#ffe9d6", // Naranja pastel
		"#ffffd1", // Amarillo pastel
		"#d6ffda", // Verde menta
		"#d7eeff", // Azul cielo suave
		"#dad6ff", // Lila claro
		"#ffd6e8", // Rosa chicle
		"#f5f5dc", // Beige
		"#f4e4e4", // Rosa apagado
		"#e4e6f4", // Azul lavanda
		"#ffe3c6", // Durazno suave
		"#ffffba", // Amarillo pálido
		"#c6ffe3", // Verde agua
		"#c6d7ff", // Azul pastel
		"#e3c6ff", // Lila pálido
		"#ffc6d7", // Rosa coral
		"#f7f5d4", // Crema pastel
		"#f2e1e1", // Rosa perlado
		"#e1e2f2", // Azul grisáceo
		"#fff1d6", // Naranja pálido
		"#f1ffd6", // Verde limón suave
		"#d6f1ff", // Azul hielo
		"#d6d8ff", // Lila azulado
		"#ffd6f1", // Rosa lavanda
	];

	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	return randomColor;
}

const stackItem = (vehiculo: Vehiculo) => {
	return `<li class="vehiculo-item" style='background-color: ${vehiculo.cssColor}'>
        <p> <b> Placas: </b> ${vehiculo.placas}</p>
        <p> <b> Marca: </b> ${vehiculo.marca}</p>
        <p> <b> Modelo: </b> ${vehiculo.modelo}</p>
        <p> <b> Color: </b> ${vehiculo.color}</p>
      </li>`;
};

export function updateStackItems(onlyTop: boolean, stack: Stack<Vehiculo>) {
	const itemsList = document.querySelector(".stack-items");
	if (itemsList === null) return;

	let content = "";
	if (onlyTop) {
		const top = stack.peek();
		if (!top) return;

		content = stackItem(top);

		itemsList.innerHTML = content;
		return;
	}

	for (const vehiculo of stack.iter()) {
		content += stackItem(vehiculo);
    
	}

	itemsList.innerHTML = content;
}
