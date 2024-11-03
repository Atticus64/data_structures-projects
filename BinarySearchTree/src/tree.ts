type optNode<T> = Node<T> | null;

export class Node<T> {

    value: T;
    right: optNode<T> = null;
    left: optNode<T> = null;

    constructor(val: T, der?: optNode<T>, izq?: optNode<T>) {
        this.value = val;
        this.right = der ?? null;
        this.left = izq ?? null;
    }
}

interface Result<T> {
    curr: Node<T> | null,
    father: Node<T> | null,
    ok: boolean
}

enum Child {
    right,
    left
}

export class Tree<T> {
    root: Node<T> | null = null;

    constructor(value?: T) {
        if (!value) return;

        this.root = new Node(value);
    }

    push(input: T, deep?: Node<T>): void {
        if (this.root === null) {
            this.root = new Node(input);
            return
        }
        const curr = deep ?? this.root;
        if (curr === null) return;

        if (input === curr.value) {
            throw new Error('No se puede insertar un dato existente');
        }

        if (input > curr.value) {
            if (curr.right !== null) {
                return this.push(input, curr.right);
            }

            curr.right = new Node(input);
        } else {
            if (curr.left !== null) {
                return this.push(input, curr.left);
            }

            curr.left = new Node(input);
        }

    }

    inorder() {
        const transverse = (node?: Node<T> | null, arr: T[] = []) => {
            if (!node) return arr;

            transverse(node.left, arr);
            arr.push(node.value);
            transverse(node.right, arr);
            return arr;
        }

        return transverse(this.root);
    }


    preorden() {
        const transverse = (node?: Node<T> | null, arr: T[] = []) => {
            if (!node) return arr;

            arr.push(node.value);
            transverse(node.left, arr);
            transverse(node.right, arr);
            return arr;
        }

        return transverse(this.root);
    }

    postorden() {
        const transverse = (node?: Node<T> | null, arr: T[] = []) => {
            if (!node) return arr;

            transverse(node.left, arr);
            transverse(node.right, arr);
            arr.push(node.value);
            return arr;
        }

        return transverse(this.root);
    }

    insert(data: T) {
        if (this.root === null) {
            this.root = new Node(data)
            return
            //  throw new Error('No hay raiz');
        }

        const query = this.search(data)

        if (query.ok) {
            throw new Error('El dato ya existe en el arbol')
        }


        let curr = this.root;
        while (curr !== null) {
            if (data < curr.value) {
                if (curr.left !== null) {
                    curr = curr.left;
                    continue;
                }

                curr.left = new Node(data);
                break;
            }

            if (data > curr.value) {
                if (curr.right !== null) {
                    curr = curr.right;
                    continue;
                }

                curr.right = new Node(data);
                break;
            }

        }

    }

    search(item: T, node?: Node<T>, father?: Node<T>): Result<T> {
        if (!this.root) {
            throw new Error('No hay raiz');
        }

        let curr;
        if (node === undefined) {
            curr = this.root;
        } else {
            curr = node;
        }

        if (item === curr.value) {
            return {
                curr,
                father: father ?? null,
                ok: true
            }
        } else if (item < curr.value && curr.left !== null) {
            return this.search(item, curr.left, curr)
        } else if (item > curr.value && curr.right !== null) {
            return this.search(item, curr.right, curr)
        }

        return {
            curr: null,
            father: null,
            ok: false
        };
    }

    print(root?: Node<T> | null, tag?: string) {
        let rt = root;
        if (rt === undefined) {
            rt = this.root;
        }
        if (rt === null) return;

        const data = `${tag ?? 'root'}:${rt?.value}`

        this.print(rt?.left, 'left');
        console.log(data);
        this.print(rt?.right, 'right');
    }

    getChild(father: Node<T>, data: T): Child | null {
        if (father.right?.value === data) {
            return Child.right;
        } else if (father.left?.value === data) {
            return Child.left;
        }

        return null;
    }

    remove(value: T) {

        const query = this.search(value)
        if (!query.ok) {
            return {
                data: null,
                error: 'No se encontro el dato'
            }
        }

        const removeNode = (node: Node<T> | null, value: T) => {
            if (!node) {
                return null;
            }

            if (value == node.value) {
                if (!node.left && !node.right) {
                    return null;
                }

                if (!node.left) {
                    return node.right;
                }

                if (!node.right) {
                    return node.left;
                }

                let temp = node.right;
                let parent = null;
                while (temp) {
                    if (!temp.left) {
                        break;
                    }
                    parent = temp;
                    temp = temp.left;
                }

                node.value = temp.value;

                if (!parent) {
                    node.right = temp.right;
                } else if (!parent.left?.right) {
                    parent.left = null;
                } else {
                    parent.left = temp.right;
                }
            } else if (value < node.value) {
                node.left = removeNode(node.left, value);
                return node;
            }
            node.right = removeNode(node.right, value);
            return node;
        };

        this.root = removeNode(this.root, value);
        return {
            error: null,
            data: {
                father: query.father,
                node: value
            }
        }
    }

    generateHtml(node: Node<T> | null) {
        if (node === null) return '';

        // Crear HTML del nodo actual
        let nodeHtml = `
            <li >
                <div class="node-${node.value}" class="node">${node.value}</div>
        `;

        // Verificar si el nodo tiene hijos
        if (node.left || node.right) {
            nodeHtml += `<ul>`;

            // Agregar subárbol izquierdo y derecho, si existen
            nodeHtml += this.generateHtml(node.left);
            nodeHtml += this.generateHtml(node.right);

            nodeHtml += `</ul>`;
        }

        nodeHtml += `</li>`;

        return nodeHtml;
    }

    // Función para generar el HTML de todo el árbol
    generateTreeHtml() {
        return `
            <div class="tree">
                <ul>
                    ${this.generateHtml(this.root)}
                </ul>
            </div>
        `;
    }

    // delete(data: T) {
    //      const query = this.search(data);
    //
    //      if (query.ok) {
    //              const { curr, father } = query;
    //              if (!curr || !father) return;
    //              const has_childs = curr.left !== null || curr.right !== null
    //              const two_childs = curr.left !== null && curr.right !== null
    //
    //              console.log(`delete  ${data} ${has_childs ? 'hijos' : 'no hijos'}`)
    //              console.log(`${two_childs ?  'dos hijos' : 'no dos' }`)
    //              if (!has_childs) {
    //                      const side = this.getChild(father, data);
    //                      if (side === null) return;
    //
    //                      if (side === Child.left) {
    //                              father.left = null;
    //                      } else if (side === Child.right) {
    //                              father.right = null;
    //                      }
    //                      console.log(father);
    //              } else if (two_childs) {
    //                      console.log('two');
    //              } else if (has_childs) {
    //
    //                      if (curr.left !== null) {
    //                              father.left = curr.left;
    //                      } else if (curr.right !== null) {
    //                              father.right = curr.right;
    //                      }
    //              }
    //      }
    // }

}

const prettyPrint = <T>(node: Node<T>, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
