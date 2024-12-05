class Pilha {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item); // Adiciona o item ao topo da pilha
    }

    pop() {
        return this.items.pop(); // Remove e retorna o item do topo da pilha
    }

    peek() {
        return this.items[this.items.length - 1]; // Retorna o item no topo sem removê-lo
    }

    isEmpty() {
        return this.items.length === 0; // Verifica se a pilha está vazia
    }

    clear() {
        this.items = []; // Esvazia a pilha
    }
}

export default Pilha;
