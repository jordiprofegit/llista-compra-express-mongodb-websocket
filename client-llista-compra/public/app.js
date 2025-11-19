class LlistaCompraClient {
    constructor() {
        this.socket = null;
        this.productList = document.getElementById('productList');
        this.statusElement = document.getElementById('status');
        this.connect();
    }

    connect() {
        alert("iee");
        // Connectar al servidor de llista de compra (ajusta la URL si és necessari)
        this.socket = io('http://localhost:3000');
        
        this.socket.on('connect', () => {
            console.log('Connectat al servidor');
            this.updateStatus('connected', 'Connectat al servidor');
        });
        
        this.socket.on('disconnect', () => {
            console.log('Desconnectat del servidor');
            this.updateStatus('disconnected', 'Desconnectat del servidor');
        });
        
        this.socket.on('nouProducte', (producte) => {
            console.log('Nou producte rebut:', producte);
            this.afegirProducte(producte);
        });
        
        this.socket.on('connect_error', (error) => {
            console.error('Error de connexió:', error);
            this.updateStatus('disconnected', 'Error de connexió al servidor');
        });
    }

    updateStatus(status, message) {
        this.statusElement.textContent = message;
        this.statusElement.className = `status ${status}`;
    }

    afegirProducte(producte) {
        // Eliminar el missatge d'estat buit si existeix
        const emptyState = this.productList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const li = document.createElement('li');
        li.className = 'product-item';
        
        li.innerHTML = `
            <div class="product-info">
                <span class="product-name">${this.escapeHtml(producte.nom)}</span>
                <span class="new-badge">NOU!</span>
                <div class="product-details">
                    Quantitat: ${producte.quantitat} ${producte.unitat} 
                    ${producte.categoria ? `| Categoria: ${this.escapeHtml(producte.categoria)}` : ''}
                </div>
            </div>
            <div class="product-time">${new Date().toLocaleTimeString('ca-ES')}</div>
        `;

        // Afegir al principi de la llista
        this.productList.insertBefore(li, this.productList.firstChild);

        // Eliminar l'animació després de 5 segons
        setTimeout(() => {
            const badge = li.querySelector('.new-badge');
            if (badge) {
                badge.remove();
            }
        }, 5000);
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Inicialitzar l'aplicació quan el document estigui carregat
document.addEventListener('DOMContentLoaded', () => {
    new LlistaCompraClient();
});