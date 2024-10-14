export class Queue<T> {
	#front = -1;
	#end = -1;
	#elements: T[] = [];
	#limit = 0;
	entriesCount = 0;

	constructor({ initial, limit }: { initial?: T; limit?: number } = {}) {
		this.#limit = limit ?? 10;

		if (!initial) {
			return;
		}

		this.#front = 0;
		this.#limit = limit ?? 10;
		this.#end = 0;
		this.entriesCount += 1;
		this.#elements[this.#front] = initial;
	}

	isFull() {
		return (
			this.#front === this.#end + 1 ||
			(this.#front === 0 && this.entriesCount === this.#limit)
		);
	}

  isEmpty() {
    return this.size() === 0;
  }

	insert(item: T) {
		if (this.isFull()) {
			throw new Error("Queue full :(");
		}

		this.entriesCount += 1;
		if (this.#front === -1) {
			this.#front = 0;
			this.#end = 0;
		} else if (this.#end === this.#limit - 1) {
			this.#end = 0;
		} else {
			this.#end += 1;
		}

		this.#elements[this.#end] = item;
	}

	dequeue() {
		this.entriesCount -= 1;
		if (this.#front === -1) {
			throw new Error("No hay elementos en la Queue");
		}

		const item = this.#elements[this.#front];

		if (this.#front === this.#end) {
			this.#front = -1;
			this.#end = -1;
		} else if (this.#front === this.#limit - 1) {
			this.#front = 0;
		} else {
			this.#front += 1;
		}

		return item;
	}

	size() {
		return this.entriesCount;
	}

  limit() {
    return this.#limit;
  }

  get(index: number) {
    return this.#elements[index]
  }

	infoCurr() {
		if (this.#front === -1) return;

		return this.#elements[this.#front];
	}

	infoNext() {
		if (this.#front === this.#end) {
			return null;
		}

		let index = -1;
		if (this.#front === this.#limit - 1) {
			index = 0;
		} else {
			index = this.#front + 1;
		}

		return this.#elements[index];
	}

	debug(label = "log") {
		console.log({
			label,
			elem: this.#elements,
			size: this.entriesCount,
		});
	}
}
