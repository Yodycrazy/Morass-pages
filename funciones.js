document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  // Estado inicial para accesibilidad
  menuToggle.setAttribute('aria-expanded', 'false');

  // Función para alternar el menú
  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  };

  // Evento del botón hamburguesa
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el evento llegue al document
    toggleMenu();
  });

  // Cerrar menú al hacer clic en enlaces (solo móvil)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Solo para móviles (cuando el menú está visible)
      if (window.getComputedStyle(menuToggle).display !== 'none') {
        if (!this.hash && this.getAttribute('href').startsWith('.')) {
          e.preventDefault();
          toggleMenu();
          setTimeout(() => {
            window.location.href = this.getAttribute('href');
          }, 300);
        }
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function() {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Textarea placeholder (tu código original)
  const textarea = document.getElementById('message');
  const placeholder = document.querySelector('.placeholder-text-wrapper');
  
  if (textarea && placeholder) {
    const updatePlaceholder = () => {
      const shouldHide = textarea.value.length > 0 || document.activeElement === textarea;
      placeholder.style.opacity = shouldHide ? '0' : '1';
      placeholder.style.visibility = shouldHide ? 'hidden' : 'visible';
    };
    
    ['input', 'focus', 'blur'].forEach(evt => {
      textarea.addEventListener(evt, updatePlaceholder);
    });
    
    updatePlaceholder();
  }
});

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Deshabilitar botón para evitar múltiples envíos
  submitButton.disabled = true;
  submitButton.innerHTML = '<div class="text-container-2"><span class="CTA-4">Enviando...</span></div>';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('✓ Mensaje enviado. Nos pondremos en contacto contigo pronto.');
      form.reset();
    } else {
      throw new Error('Error en el servidor');
    }
  } catch (error) {
    alert('⚠ Error al enviar. Por favor contáctanos directamente por WhatsApp.');
    window.open(`https://wa.me/573044533399?text=${encodeURIComponent(document.getElementById('message').value)}`);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = '<div class="text-container-2"><span class="CTA-4">Enviar</span></div>';
  }
});