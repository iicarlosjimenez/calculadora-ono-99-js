class Ono99Calculator {
    constructor() {
        this.currentValue = 0; // Valor inicial
        this.history = [];      // Para la función deshacer
        this.container = document.getElementById('cards-container');
        this.input = document.getElementById('current-value');

        // Configuración de las tarjetas
        this.cards = [
            { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },
            { value: 6, underline: true }, { value: 7 }, { value: 8 },
            { value: 9, underline: true }, { value: 10 }, { value: -10, negative: true }
        ];

        this.initializeGame();
    }

    createCard(cardData) {
        const card = document.createElement('div');
        card.className = `card ${cardData.underline ? 'underline' : ''} ${cardData.negative ? 'negative' : ''}`;

        // Usar template literal para la estructura interna
        card.innerHTML = `
            <div class="card-top">${cardData.value}</div>
            <hr>
            <div class="card-content">${cardData.value}</div>
            <hr>
            <div class="card-footer">${cardData.value}</div>
        `;

        // Agregar el event listener
        card.addEventListener('click', () => this.addValue(cardData.value));

        return card;
    }

    initializeGame() {
        // Limpiar el contenedor
        this.container.innerHTML = '';

        // Crear y agregar todas las tarjetas
        this.cards.forEach(cardData => {
            const card = this.createCard(cardData);
            this.container.appendChild(card);
        });

        this.updateDisplay();
    }

    setValue(value) {
        this.currentValue = value
    }

    addValue(value) {
        // Guardar el valor actual en el historial
        this.history.push(this.currentValue);

        // Actualizar el valor
        this.currentValue = Math.min(99, Math.max(0, this.currentValue + value));

        this.updateDisplay();
    }
    
    undo() {
        if (this.history.length > 0) {
            this.currentValue = this.history.pop();
            this.updateDisplay();
        }
    }
    
    reset() {
        this.currentValue = 0;
        this.history = [];
        this.updateDisplay();
    }
    
    updateDisplay() {
        if (this.currentValue > 98) {
            this.input.style.color = '#E4253C'
            // hacer sonido de error
            // Leer el número en voz alta
            // const msg = new SpeechSynthesisUtterance("Jajaja. PENDEJO!");
            // msg.lang = 'es-ES'; // Configurar idioma español
            // speechSynthesis.speak(msg);
        }
        else {
            this.input.style.color = 'white'
            // hacer sonido del calor numérico
            if (this.currentValue > 0) {
                // Leer el número en voz alta
                // const msg = new SpeechSynthesisUtterance(this.currentValue.toString());
                // msg.lang = 'es-ES'; // Configurar idioma español
                // speechSynthesis.speak(msg);
            }
        }
        this.input.value = this.currentValue;
    }
}

// Inicializar el juego
const game = new Ono99Calculator();

// Agregar event listeners para los botones
document.getElementById('button-undo').addEventListener('click', () => game.undo());
document.getElementById('button-reset').addEventListener('click', () => game.reset());

const input = document.getElementById('current-value');

input.addEventListener('input', function () {
    // Elimina cualquier caracter no numérico
    let value = this.value.replace(/[^0-9]/g, '');

    // Limita a 2 dígitos
    if (value.length > 2) {
        value = value.slice(0, 2);
    }

    // Asegura que el valor esté entre 0 y 99
    value = Math.min(99, Math.max(0, parseInt(value) || 0));

    // Actualiza el valor del input
    this.value = value;
    game.setValue(value)
});

// Previene 'e', '+', '-' y '.'
input.addEventListener('keydown', function (e) {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
        e.preventDefault();
    }
});