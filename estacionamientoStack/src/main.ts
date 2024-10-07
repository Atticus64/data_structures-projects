import "./style.css";
import { Stack } from "./stack";
import { searchVehiculo, Vehiculo } from "./vehiculo";
import {
	getRandomColor,
	playSoundError,
	updateMessageRemaining,
	updateStackItems,
} from "./render";

const form: HTMLFormElement | null = document.querySelector(".form_carro");
const desapilarBtn = document.querySelector(".pop-carro");
const searchBtn = document.querySelector(".search");
const inputQuery: HTMLInputElement | null = document.querySelector("#query");
const criteriaInput: HTMLSelectElement | null =
	document.querySelector("#criteria");
export const mostrarBtn = document.querySelector(".top-carro");
export const Estacionamiento = new Stack<Vehiculo>();
let status: "stack" | "top" | "search" = "stack";

interface Input {
	placas?: string;
	marca?: string;
	modelo?: string;
	color?: string;
}

function invalidVehiculo(input: Input) {
	const are_undefined_values =
		!input.color || !input.marca || !input.modelo || !input.placas;

	if (are_undefined_values) {
		return {
			err: "Valores indefinidos en el formulario",
			is_err: are_undefined_values,
		};
	}
	input.color = input.color?.trim();
	input.marca = input.marca?.trim();
	input.modelo = input.modelo?.trim();
	input.placas = input.placas?.trim();

	const empty_values =
		input.color === "" ||
		input.marca === "" ||
		input.modelo === "" ||
		input.placas === "";

	if (empty_values) {
		return {
			err: "Valores vacios en el formulario",
			is_err: empty_values,
		};
	}

	return {
		is_err: false,
		err: null,
	};
}

function busquedaProcess() {
	if (Estacionamiento.size() <= 0) {
		return;
	}

	if (!criteriaInput || !inputQuery) {
		return;
	}

	const inputCrit = criteriaInput.options[criteriaInput.selectedIndex].value;
	const criterio = inputCrit as keyof Vehiculo;
	const query = inputQuery.value;

	const items = searchVehiculo(Estacionamiento, criterio, query);

  status = "search"
  updateMostrarStatus()
	updateStackItems(false, items);
}

function updateMostrarStatus() {
	const title = document.querySelector(".title-show");
	if (!title || !mostrarBtn) return;

  let valueTitle = "";
	let btnValue = "";
	if (status === "stack") {
    valueTitle = "Elementos del Stack";
    btnValue = "Mostrar Cima (último carro)";
	} 
  if (status === "top") {
    valueTitle = "La cima del Stack";
    btnValue = "Mostrar todos los elementos";
	}

  if (status === "search") {
		valueTitle = "Elementos de la Búsqueda";
		btnValue = "Mostrar todos los elementos";
  }

	mostrarBtn.textContent = btnValue;
	title.textContent = valueTitle;
}


desapilarBtn?.addEventListener("click", () => {

  if (Estacionamiento.size() === 0) return

	Estacionamiento.pop();
	updateMessageRemaining();
	updateStackItems(false, Estacionamiento);
});

mostrarBtn?.addEventListener("click", () => {

  if (status === "search") status = "top"

  if (status === "stack") {
    status = "top"
  } else {
    status = "stack"
  }
  

	updateMostrarStatus();
	updateStackItems(status === "top", Estacionamiento);


});

form?.addEventListener("submit", (e: SubmitEvent) => {
	e.preventDefault();
	if (!e.target) return;

	const formData = new FormData(e.target as HTMLFormElement);
	const placas = formData.get("placas") as string;
	const marca = formData.get("marca") as string;
	const modelo = formData.get("modelo") as string;
	const color = formData.get("color") as string;
	const { err } = invalidVehiculo({ placas, marca, modelo, color });
	if (err !== null) {
		playSoundError(err);
		return;
	}

	const cssColor = getRandomColor();
	const vh = new Vehiculo(placas, marca, modelo, color);
	vh.cssColor = cssColor;
	Estacionamiento.push(vh);
	Estacionamiento.debug();

	updateMessageRemaining();

	form.reset();

	updateStackItems(false, Estacionamiento);
});

searchBtn?.addEventListener("click", () => {
	busquedaProcess();
});

inputQuery?.addEventListener("keyup", (event) => {
	if (event.key === "Enter") busquedaProcess();
});