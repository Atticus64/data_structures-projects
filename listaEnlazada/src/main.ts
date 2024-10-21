import { toast } from "wc-toast";
import { LinkedList } from "./linked";
import "./style.css";

const arrow = `
<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" class="arrow" viewBox="0 0 24 24">
  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
    stroke-width="1.5"
    d="M12 4.5v15m0 0l-6-5.625m6 5.625l6-5.625" />
</svg>`
const form: HTMLFormElement | null = document.querySelector("#list-menu");
const commands: HTMLSelectElement | null = document.querySelector("#command");
const List = new LinkedList<string>(10);

const ACTIONS = {
	ADD_START: "add-start",
	ADD_END: "add-end",
	ADD_AFTER: "add-after",
	ADD_BEFORE: "add-before",
	SEARCH: "search",
	REMOVE_START: "remove-start",
	REMOVE_END: "remove-end",
	REMOVE: "remove-elem",
	ITER: "iter",
};

interface Info {
	data: string | null;
	action: string;
	argument: string | null;
}

export function getColor(i: number) {
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
		"#e1e2f2", // Azul grisáceo
		"#fff1d6", // Naranja pálido
		"#f1ffd6", // Verde limón suave
		"#d6f1ff", // Azul hielo
		"#d6d8ff", // Lila azulado
		"#ffd6f1", // Rosa lavanda
	];

	const color = colors[i];
	return color;
}

const validInput = (input: FormData) => {
	if (input.get("command") !== null) {
		const commands = Object.values(ACTIONS);
		const data = input.get("data") as string;
		const action = input.get("command") as string;

		if (!commands.includes(action)) {
			return {
				input: null,
				is_err: true,
				err: "No existe esa accion",
			};
		}
		const argument = input.get("argument") as string;
		const info: Info = {
			data,
			action,
			argument,
		};

		return {
			info,
			is_err: false,
			err: null,
		};
	}

	return {
		input: null,
		is_err: true,
		err: "Input invalido",
	};
};

function checkError(ok: boolean, error: string | null, msg: string | null) {
	if (ok) {
		toast.success(msg ?? "Operación exitosa");
	} else {
		toast.error(error ?? "Acción invalida");
	}
}

function executeAction(info: Info) {
	switch (info.action) {
		case ACTIONS.ADD_START: {
			if (!info.data) {
				return;
			}

			const { ok, error, msg } = List.unshift(info.data);
			checkError(ok, error, msg);

			break;
		}
		case ACTIONS.ADD_END: {
			const { data } = info;
			if (!data) {
				return;
			}

			const { error, msg, ok } = List.push(data);
			checkError(ok, error, msg);
			break;
		}
		case ACTIONS.ADD_BEFORE: {
			const { data, argument } = info;
			if (!data || !argument) {
				return;
			}

			const { error, msg, ok } = List.insertBefore(data, argument);
			checkError(ok, error, msg);
			break;
		}
		case ACTIONS.ADD_AFTER: {
			const { data, argument } = info;
			if (!data || !argument) {
				return;
			}

			const { error, msg, ok } = List.insertAfter(data, argument);
			checkError(ok, error, msg);
			break;
		}
		case ACTIONS.ITER: {
			draw(List);
			break;
		}
		case ACTIONS.REMOVE_START: {
			const { error, msg, ok } = List.deleteStart();
			checkError(ok, error, msg);
			break;
		}
		case ACTIONS.REMOVE_END: {
			const { error, msg, ok } = List.deleteEnd();
			checkError(ok, error, msg);
			break;
		}
		case ACTIONS.REMOVE: {
			const { data } = info;
			if (!data) {
				return;
			}

			const { error, msg, ok } = List.deleteExact(data);
			checkError(ok, error, msg);
			break;
		}
		case ACTIONS.SEARCH: {
			const { data } = info;
			if (!data) {
				return;
			}

			const { error, msg, ok } = List.search(data);
			checkError(ok, error, msg);
			break;
		}
		default: {
		}
	}
}

function typeAction(command: string) {
	switch (command) {
		case ACTIONS.ADD_START:
		case ACTIONS.ADD_END:
		case ACTIONS.ADD_AFTER:
		case ACTIONS.ADD_BEFORE:
			return "añadir";
		case ACTIONS.ITER:
		case ACTIONS.REMOVE_END:
		case ACTIONS.REMOVE_START:
			return "ignorar";
		case ACTIONS.REMOVE:
			return "eliminar";
		case ACTIONS.SEARCH:
			return "buscar";
		default:
			return "none";
	}
}

function requirementsAction(command: string) {
	const requirements = {
		data: false,
		args: false,
	};

	switch (command) {
		case ACTIONS.REMOVE_END:
		case ACTIONS.REMOVE_START:
		case ACTIONS.ITER:
			return requirements;
		case ACTIONS.ADD_START:
		case ACTIONS.ADD_END:
		case ACTIONS.REMOVE:
		case ACTIONS.SEARCH:
			requirements.data = true;
			return requirements;
		case ACTIONS.ADD_AFTER:
		case ACTIONS.ADD_BEFORE:
			requirements.data = true;
			requirements.args = true;
			return requirements;
		default:
			return requirements;
	}
}

function showList<T>(list: LinkedList<T>) {
	const container = document.querySelector("section.list");
	if (!container) return;

	if (list.length === 0) {
		container.innerHTML = `
      <div>
        Lista Vacia
      </div>
    `;
		return;
	}
	let content = "";

	let i = 0;
	for (const elem of list.iter()) {
		content += `
     <div class="elem" style='background-color: ${getColor(i)}'>
        <p>${elem.value}</p>
      </div>
      ${arrow}
    `;
		i++;
	}

	content += `
    <div>Null</div>
  `;

	container.innerHTML = content;
}

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function draw<T>(list: LinkedList<T>) {
	const container = document.querySelector("section.list");
	if (!container) return;

	container.innerHTML = "";
	if (list.length === 0) {
		container.innerHTML = `
      <div>
        Lista Vacia
      </div>
    `;
		return;
	}

	const items = [];
	for (const elem of list.iter()) {
		items.push(elem);
	}

	for (let i = 0; i < items.length; i++) {
		const content = `
       <div class="elem" style='background-color: ${getColor(i)}'>
          <p>${items[i].value}</p>
        </div>
        ${arrow}

              `;
		container.innerHTML += content;
		await timer(500);
	}

	const content = `
    <div>Null</div>
  `;
	container.innerHTML += content;
}

commands?.addEventListener("change", (event) => {
	if (!(event.target instanceof HTMLSelectElement)) return;

	const action = event.target.value;
	const req = requirementsAction(action);
	const desc: HTMLLabelElement | null = document.querySelector(".desc");
	const dataInput: HTMLInputElement | null = document.querySelector("#data");
	const argInput: HTMLInputElement | null = document.querySelector("#argument");

	if (!dataInput || !argInput || !desc) return;

	desc.textContent = `Dato a ${typeAction(action)}`;
	dataInput.disabled = true;
	argInput.disabled = true;

	if (req.data) {
		dataInput.disabled = false;
	}

	if (req.args) {
		argInput.disabled = false;
	}
});

form?.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(e.target as HTMLFormElement);
	const res = validInput(formData);

	if (!res.info) return;

	executeAction(res.info);
	if (
		typeAction(res.info.action) === "buscar" ||
		res.info.action === ACTIONS.ITER
	) {
		return;
	}

	showList(List);
});
