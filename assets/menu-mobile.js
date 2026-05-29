const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('menu-overlay');
const close = document.getElementById('menu-close');

function openMenu() {
  menu.classList.remove('-translate-x-full');
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  overlay.classList.add('opacity-100', 'pointer-events-auto');
  toggle.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menu.classList.add('-translate-x-full');
  overlay.classList.add('opacity-0', 'pointer-events-none');
  overlay.classList.remove('opacity-100', 'pointer-events-auto');
  toggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', openMenu);
close.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);