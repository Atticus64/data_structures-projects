import { cola } from "./main";
import { Truck } from "./truck";

export async function fromFile(path: string) {
  const resp = await fetch(path);
  const data = await resp.json();

  for (const d of data) {
    const truck = new Truck(d)
    cola.insert(truck)
  }

}

