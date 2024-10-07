import { Stack } from "./stack"

export class Vehiculo {
  placas: string
  marca: string
  modelo: string
  color: string
  cssColor?: string

  constructor(placas: string, marca: string, modelo: string, color: string) {
    this.placas = placas
    this.marca = marca
    this.modelo = modelo
    this.color = color
  }
}

export function searchVehiculo(vehiculos: Stack<Vehiculo>, criteria: keyof Vehiculo, query: string) {

  const items: Stack<Vehiculo> = new Stack()
  for (const curr of vehiculos.iter()) {
    const prop = curr[criteria]?.toLowerCase()
    if (!prop) continue

    if (prop === query.toLowerCase() || prop.includes(query.toLowerCase())) {
      items.push(curr)
    }
  }

  return items 
}