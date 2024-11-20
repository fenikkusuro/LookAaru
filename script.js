import { createServiceNavigation } from './navigation.js';
import { initializeCart, addToCart } from './cart.js';

const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize service navigation
  const serviceNavContainer = document.getElementById('service-navigation');
  if (serviceNavContainer) {
    serviceNavContainer.appendChild(createServiceNavigation());
  }

  // Initialize cart
  initializeCart();

  // Load services
  loadServices();

  // Load promotions
  loadPromotions();

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const { id, name, price } = button.dataset;
      addToCart({ id, name, price: parseFloat(price) });
    });
  });

  // Login and register modal functionality
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
});

function loadServices() {
  const serviceList = document.getElementById('service-list');
  const services = [
    { name: 'Servicios Fúnebres', url: 'services/servicios-funebres.html' },
    { name: 'Servicios Médicos', url: 'services/servicios-medicos.html' },
    { name: 'Cementerios y Cinerarios', url: 'services/cementerios-cinerarios.html' },
    { name: 'Urnas', url: 'services/urnas.html' },
    { name: 'Trámites Legales', url: 'services/tramites-legales.html' },
    { name: 'Avisos en Periódico', url: 'services/avisos-periodico.html' },
    { name: 'Traslados', url: 'services/traslados.html' },
    { name: 'Florería', url: 'services/floreria.html' },
    { name: 'Crear Video de Despedida', url: 'services/crear-video-despedida.html' }
  ];

  serviceList.innerHTML = services.map(service => `
    <li><a href="${service.url}">${service.name}</a></li>
  `).join('');
}

async function loadPromotions() {
  const promotionsContainer = document.getElementById('promotions-container');
  try {
    const response = await fetch(`${API_URL}/promotions`);
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