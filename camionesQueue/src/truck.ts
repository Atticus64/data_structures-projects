export interface Input {
	nombre: string;
	celular: string;
	fecha: string;
	color: string;
	marca: string;
	modelo: string;
	matricula: string;
}

export class Truck {
	nombre: string;
	celular: string;
	fecha: string;
	color: string;
	marca: string;
	modelo: string;
	matricula: string;

  constructor({ nombre, celular, fecha, color, marca, modelo, matricula }: Input) {
    this.nombre = nombre
    this.modelo = modelo
    this.matricula = matricula
    this.marca = marca
    this.celular = celular
    this.fecha = fecha
    this.color = color
  }

}
