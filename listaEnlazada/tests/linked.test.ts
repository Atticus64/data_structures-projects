import { it, describe, expect } from "vitest";
import { LinkedList } from "../src/linked";

describe("add items to Linked list", () => {
	it("Should the length be 4", () => {
		const list = new LinkedList<number>(5);

		list.push(4);
		list.unshift(6);
		list.push(10);
		list.unshift(7);

		expect(list.length).toBe(4);
	});

	it("Should the first to be 10", () => {
		const list = new LinkedList<number>(5);

		list.push(4);
		list.unshift(6);
		list.push(7);
		list.unshift(10);

		expect(list.deleteStart().data).toBe(10);
	});
});

describe("Caso multiple", () => {
	it("Caso de Profesor Alejandro", () => {
		const list = new LinkedList<string>(10);
		list.unshift("O");
		list.unshift("T");
		list.unshift("I");
		list.unshift("X");
		list.unshift("E");

    expect(list.print()).toBe('E->X->I->T->O->null');

		list.push("2014");
    expect(list.print()).toBe('E->X->I->T->O->2014->null');

		list.unshift("T");
		list.unshift("M");
		list.unshift("S");
		list.unshift("A");
		list.deleteStart();
		list.deleteStart();

    expect(list.length).toBe(8);
		list.insertBefore("*", "Z");

    expect(list.search("Z").ok).toBe(false);
		list.insertBefore("*", "2014");
    expect(list.search("*").data).toBe(7);
		list.insertAfter("S", "O");
    expect(list.search("S").data).toBe(7);
    expect(list.search("*").data).toBe(8);
		list.deleteStart();
		list.deleteEnd();
		const { msg } = list.deleteExact("T");
    expect(msg).toBe("Se elimino el dato T")
    
		list.deleteStart();
		list.deleteStart();
		list.deleteStart();
		list.deleteStart();
		list.deleteStart();
		list.deleteStart();
		list.deleteStart();
    expect(list.length).toBe(0);
	});
});
