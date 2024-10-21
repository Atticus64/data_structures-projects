function OK<T>(msg: string, value?: T) {
	return {
		error: null,
		msg,
		data: value ?? null,
		ok: true,
	};
}

const ERROR = (err: string) => ({
	error: err,
	data: null,
	msg: null,
	ok: false,
});

class Node<T> {
	value: T;
	next: Node<T> | null = null;

	constructor(val: T, next: Node<T> | null = null) {
		this.value = val;
		this.next = next;
	}
}

export class LinkedList<T> {
	root: Node<T> | null = null;
	length = 0;
	#limit: number;

	constructor(limit?: number) {
		this.#limit = limit ?? 10;
	}

	push(value: T) {
		if (this.length === this.#limit) {
			return ERROR("Cola enlazada llena");
		}

		if (this.root === null || this.length === 0) {
			this.root = new Node(value);
			this.length++;
			return OK(`Se agrego el dato ${value} al final`);
		}

		let curr = this.root;

		while (curr.next !== null) {
			curr = curr.next;
		}

		this.length++;
		curr.next = new Node(value);
		return OK(`Se agrego el dato ${value} al final`);
	}

	unshift(val: T) {
		if (this.length === this.#limit) {
			return ERROR("Cola enlazada llena");
		}
		const curr = this.root;

		const data = new Node(val, curr);
		this.root = data;
		this.length++;

		return OK(`Se inserto el dato ${val} al inicio`, val);
	}

	insert(value: T, index: number) {
		if (this.length === this.#limit) {
			return ERROR("Cola enlazada llena");
		}

		if (index > this.length) {
			this.length += 1;
			return;
		}

		let curr = this.root;
		let idx = 0;

		while (curr !== null) {
			if (idx + 1 === index && curr.next !== null) {
				const data = new Node(value, curr.next);
				curr.next = data;
				break;
			}

			if (idx + 1 === index) {
				const data = new Node(value, null);
				curr.next = data;
			}
			curr = curr.next;
			idx++;
		}

		this.length += 1;

		return OK(`Dato insertado en pos ${index}`);
	}

	insertBefore(data: T, search: string) {
		if (this.length === this.#limit) {
			return ERROR("Cola enlazada llena");
		}

		if (this.root === null) {
			return ERROR("Lista esta vacia");
		}

		let curr = this.root;

		if (search === curr.value) {
			const nuevo = new Node(data, curr);
			this.root = nuevo;
			this.length += 1;
			return OK(`Se inserto el ${data} antes de ${curr.value}`);
		}

		while (curr.next !== null) {
			if (curr.next.value === search) {
				const nuevo = new Node(data, curr.next);
				curr.next = nuevo;
				this.length += 1;
				return OK(`Se inserto el ${data} antes de ${curr.value}`);
			}
			curr = curr.next;
		}

		return ERROR(
			`No se encontro el dato ${search} para insertar ${data} antes`,
		);
	}

	insertAfter(data: T, search: string) {
		if (this.length === this.#limit) {
			return ERROR("Cola enlazada llena");
		}

		if (this.root === null) {
			return ERROR("Lista esta vacia");
		}

		let curr: Node<T> | null = this.root;

		if (search === curr.value) {
			const nuevo = new Node(data, curr.next);
			this.root.next = nuevo;
			this.length += 1;
			return OK(`Se inserto el ${data} después de ${curr.value}`);
		}

		while (curr !== null) {
			if (curr.value === search) {
				const nuevo = new Node(data, curr.next);
				curr.next = nuevo;
				this.length += 1;
				return OK(`Se inserto el ${data} después de ${curr.value}`);
			}
			curr = curr.next;
		}

		return ERROR(
			`No se encontro el dato ${search} para insertar ${data} después`,
		);
	}

	deleteStart() {
		if (this.length === 0) {
			return ERROR("La lista esta vacia");
		}

		const curr: Node<T> | null = this.root;
		if (curr === null) {
			return ERROR("Lista esta vacía");
		}

		this.length -= 1;
		this.root = curr.next;
		return OK(`Se elimino el dato ${curr.value}`, curr.value);
	}

	deleteEnd() {
		if (this.length === 0 || this.root === null) {
			return ERROR("La lista esta vacia");
		}

		const curr = this.root;

		if (curr.next === null) {
			this.root = null;
			this.length -= 1;
			return OK("Se elimino el unico nodo", curr.value);
		}

		let item = curr.next;
		let prev = curr;
		while (item.next !== null) {
			prev = item;
			item = item.next;
		}

		prev.next = null;
		this.length -= 1;
		return OK(`Se elimino el dato ${item.value}`, item.value);
	}

	deleteExact(data: T) {
		let curr = this.root;
		if (curr === null) {
			return ERROR("Lista esta vacía");
		}

		if (data === curr.value) {
			const head = curr.next;
			this.root = head;
			this.length -= 1;
			return OK(`Se elimino el dato ${data}`, data);
		}

		while (curr.next !== null) {
			if (data === curr.next.value) {
				curr.next = curr.next.next;
				this.length -= 1;
				return OK(`Se elimino el dato ${data}`, data);
			}
			curr = curr.next;
		}

		return ERROR("No se encontro el dato a eliminar");
	}

	search(item: string) {
		if (this.length === 0 || this.root === null) {
			return ERROR("La lista esta vacia");
		}

		let curr: Node<T> | null = this.root;
		let pos = 0;
		while (curr !== null) {
			if (curr.value === item) {
				return OK(`Se encontro el dato en la pos ${pos}`, pos);
			}
			curr = curr.next;
			pos++;
		}

		return ERROR(`No se encontro el dato ${item}`);
	}

	*iter() {
		if (this.length === 0 || this.root === null) {
			return;
		}

		let curr: Node<T> | null = this.root;
		while (curr !== null) {
			yield curr;
			curr = curr.next;
		}
	}

	print() {
		if (this.length === 0 || this.root === null) {
			return "empty";
		}

		let list = "";
		let curr: Node<T> | null = this.root;
		while (curr.next !== null) {
			list += `${curr.value}->`;
			curr = curr.next;
		}
		list += `${curr.value}->null`;
		return list;
	}

	debug() {
		const output = this.print();
		console.log({
			output,
			len: this.length,
		});
	}
}
