export function createServiceNavigation() {
  const serviceLinks = [
    { name: 'Servicios Fúnebres', url: '/services/servicios-funebres.html' },
    { name: 'Servicios Médicos', url: '/services/servicios-medicos.html' },
    { name: 'Cementerios y Cinerarios', url: '/services/cementerios-cinerarios.html' },
    { name: 'Urnas', url: '/services/urnas.html' },
    { name: 'Trámites Legales', url: '/services/tramites-legales.html' },
    { name: 'Avisos en Periódico', url: '/services/avisos-periodico.html' },
    { name: 'Traslados', url: '/services/traslados.html' },
    { name: 'Florería', url: '/services/floreria.html' },
    { name: 'Crear Video de Despedida', url: '/services/crear-video-despedida.html' },
  ];

  const nav = document.createElement('nav');
  nav.className = 'service-navigation';

  const ul = document.createElement('ul');
  serviceLinks.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}