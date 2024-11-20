document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    loadPromotions();
    setupModalListeners();
});

function initializeCart() {
    const cartCount = document.getElementById('cartCount');
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = savedCart.reduce((total, item) => total + item.quantity, 0);
}

async function loadPromotions() {
    const promotionsContainer = document.getElementById('promotions-container');
    try {
        const response = await fetch('/api/promotions');
        if (!response.ok) {
            throw new Error('Failed to fetch promotions');
        }
        const promotions = await response.json();
        promotionsContainer.innerHTML = promotions.map(promotion => `
            <div class="promotion">
                <h3>${promotion.companyName}</h3>
                <p>${promotion.serviceDescription}</p>
                <p>Área de servicio: ${promotion.serviceArea}</p>
                <a href="mailto:${promotion.contactEmail}">Contactar</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading promotions:', error);
        promotionsContainer.innerHTML = '<p>Error al cargar las promociones. Por favor, intente más tarde.</p>';
    }
}

function setupModalListeners() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const registerLink = document.getElementById('registerLink');
    const closeBtns = document.querySelectorAll('.close');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
}