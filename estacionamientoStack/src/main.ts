import "./style.css";
import { Stack } from "./stack";
import { searchVehiculo, Vehiculo } from "./vehiculo";
import {
  fromArr,
	getRandomColor,
	overflowStack,
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

	status = "search";
	updateMostrarStatus();
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
	if (Estacionamiento.size() === 0) return;

	Estacionamiento.pop();
	updateMessageRemaining();
	updateStackItems(false, Estacionamiento);
});

mostrarBtn?.addEventListener("click", () => {
	if (status === "search") status = "top";

	if (status === "stack") {
		status = "top";
	} else {
		status = "stack";
	}

	updateMostrarStatus();
	updateStackItems(status === "top", Estacionamiento);
});

form?.addEventListener("submit", (e: SubmitEvent) => {
	e.preventDefault();
	if (!e.target) return;

	if (overflowStack()) {
		playSoundError("No se pueden apilar más vehiculos");
		return;
	}

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
  updateMessageRemaining()

	form.reset();

	updateStackItems(false, Estacionamiento);
});

searchBtn?.addEventListener("click", () => {
	busquedaProcess();
});

inputQuery?.addEventListener("keyup", (event) => {
	if (event.key === "Enter") busquedaProcess();
});

const carros = [
  {
    placas: "MRS-8274",
    modelo: "Hurricane Z7",
    color: "Rojo",
    marca: "Falcon"
  },
  {
    placas: "LUX-9923",
    modelo: "Stellar LX",
    color: "Azul",
    marca: "Solaris"
  },
  {
    placas: "VXN-5412",
    modelo: "Hurricane Z7",
    color: "Negro",
    marca: "Falcon"
  },
  {
    placas: "ZJK-1198",
    modelo: "Crystal Wave",
    color: "Blanco",
    marca: "Aurora"
  },
  {
    placas: "RFD-7643",
    modelo: "Phantom X5",
    color: "Gris",
    marca: "Vortex"
  },
  {
    placas: "BQK-3042",
    modelo: "Phantom X5",
    color: "Verde",
    marca: "Vortex"
  },
  {
    placas: "JYP-6540",
    modelo: "Pulse C3",
    color: "Naranja",
    marca: "Helios"
  },
  {
    placas: "FWT-9082",
    modelo: "Spectra 4000",
    color: "Rojo",
    marca: "Zenith"
  },
  {
    placas: "XMD-3419",
    modelo: "AeroV8",
    color: "Amarillo",
    marca: "SkyDrive"
  },
  {
    placas: "GTR-6725",
    modelo: "Stellar LX",
    color: "Plata",
    marca: "Solaris"
  },
  {
    placas: "PKL-1138",
    modelo: "Blaze V6",
    color: "Negro",
    marca: "Titan"
  },
  {
    placas: "DHT-2250",
    modelo: "Eclipse Q5",
    color: "Azul",
    marca: "Lunar"
  },
  {
    placas: "BXT-9437",
    modelo: "TurboMax",
    color: "Gris",
    marca: "Voltra"
  },
  {
    placas: "QWE-1934",
    modelo: "Vortex F2",
    color: "Rojo",
    marca: "Helios"
  },
  {
    placas: "MNZ-8771",
    modelo: "Spectra 3000",
    color: "Verde",
    marca: "Zenith"
  },
  {
    placas: "LLK-7643",
    modelo: "Hurricane X3",
    color: "Blanco",
    marca: "Falcon"
  },
  {
    placas: "TRS-3319",
    modelo: "Flash S1",
    color: "Naranja",
    marca: "Nova"
  },
  {
    placas: "WWF-5555",
    modelo: "Turbo G",
    color: "Azul",
    marca: "Voltra"
  },
  {
    placas: "XTY-9212",
    modelo: "Blaze S2",
    color: "Amarillo",
    marca: "Titan"
  }
]

fromArr(carros)
updateMessageRemaining()
updateStackItems(false, Estacionamiento)