import "./style.css";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
//import { fromFile } from "./beta";
import { Queue } from "./queue";
import { Input, Truck } from "./truck";
import { toast } from "wc-toast"

const $ = (selector: string) => document.querySelector(selector);
const form: HTMLFormElement | null = document.querySelector(".form-camiones");
const dequeueBtn = document.querySelector("button.dequeue");
export const cola = new Queue<Truck>({ limit: 25 });

function contentTrucks() {
  
	const curr = cola.infoCurr();
	const next = cola.infoNext();
 
	if (!curr)
		return `
    <p>No hay Camiones encolados</p>
  `;


	if (!next) {
		return `
     <div class="truck truck-curr">
        <h3>Información Camión en Descarga</h3>
        <p><b>Matrícula: </b> ${curr.matricula} </p>
        <p><b>Marca del Camión: </b> ${curr.marca} </p>
        <p><b>Modelo:</b> ${curr.modelo} </p>
        <p><b>Color:</b> ${curr.color} </p>
        <p><b>Chofer:</b> ${curr.nombre} </p>
        <p><b>Telefono:</b> ${curr.celular} </p>
      </div>    
    `;
	}

	const content = `
    <div class="truck truck-curr">
        <h3>Información Camión en Descarga</h3>
        <p><b>Matrícula: </b> ${curr.matricula} </p>
        <p><b>Marca del Camión: </b> ${curr.marca} </p>
        <p><b>Modelo:</b> ${curr.modelo} </p>
        <p><b>Color:</b> ${curr.color} </p>
        <p><b>Chofer:</b> ${curr.nombre} </p>
        <p><b>Telefono:</b> ${curr.celular} </p>
      </div>    
    <div class="truck truck-next">
        <h3>Siguiente camión</h3>
        <div class="extra">
          <p><b>Matrícula: </b> ${next.matricula} </p>
          <p><b>Marca del Camión: </b> ${next.marca} </p>
          <p><b>Chofer:</b> ${next.nombre} </p>
          <p><b>Telefono:</b> ${next.celular} </p>
        </div>
    </div>
  `;

	return content;
}

function showTrucks() {
	const html = contentTrucks();
  const items = cola.size();

  const currentSpace = $('.size')
  const count = $('.items')
	const layout = $(".info-truck");
	if (!layout || !currentSpace || !count) return;

  currentSpace.innerHTML = `Campos disponibles: ${cola.limit() - items}`
  count.innerHTML = `Camiones encolados: ${cola.size()}`
	layout.innerHTML = html;
}

function invalidTruck(input: Input) {
  for (const entrie of Object.entries(input)) {
    if (entrie[1] === "") {
      return {
        error: `El campo ${entrie[0]} esta vacío`,
        invalid: true
      }
    }
  }

  if (Number.isNaN(Number(input.celular))) {
    return {
      error: "El campo de Celular no es un número",
      invalid: true
    }
  }

  return {
    error: null,
    invalid: false
  }
}

form?.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(e.target as HTMLFormElement);
	const parse = (key: string) => formData.get(key)?.toString().trim();
	const input = {
		matricula: parse("matricula") ?? "",
		marca: parse("marca") ?? "",
		modelo: parse("modelo") ?? "",
		color: parse("color") ?? "",
		nombre: parse("nombre") ?? "",
		celular: parse("celular") ?? "",
		fecha: new Date().toISOString(),
	};

  const { invalid, error  } = invalidTruck(input)
  if (invalid) {
    toast.error(error ?? "Los datos son invalidos")
    return;
  }

  if (cola.isFull()) {
    toast.error("La cola de camiones esta llena!")
    return;
  }

	const last = new Truck(input);
	cola.insert(last);
  toast.success(`Camión ${last.matricula} encolado!`)
	showTrucks();
});

dequeueBtn?.addEventListener("click", () => {

  if (cola.isEmpty()) {
    toast.error("No hay camiones encolados");
    return;
  }

	const elem = cola.dequeue();
  toast.success(`Camión ${elem.matricula} desencolado!`)
	showTrucks();
});

(async () => {
	//await fromFile("/data.json");
	showTrucks();
})();
