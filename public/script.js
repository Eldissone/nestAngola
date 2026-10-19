const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');
const glow = document.querySelector('.cursor-glow');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
window.addEventListener('pointermove', (event) => {
  if (glow) glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'A enviar…';
  status.textContent = '';
  try {
    const result = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await result.json();
    if (!result.ok) throw new Error(data.message);
    form.reset();
    status.textContent = data.message;
  } catch (error) {
    status.textContent = error.message || 'Não foi possível enviar o pedido. Tente novamente.';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Enviar pedido <span>↗</span>';
  }
});
