document.getElementById('yr').textContent = new Date().getFullYear();

const header = document.querySelector('header.site');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

const menuBtn = document.querySelector('.menu-btn');
const links = document.getElementById('navlinks');
menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false);
}));

const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const required = ['fname', 'lname', 'email'].map(id => form.querySelector('#' + id));
  let ok = true;
  required.forEach(i => {
    const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
    i.style.borderColor = bad ? '#b4442f' : '';
    if (bad) ok = false;
  });
  if (!ok) return;
  // TODO: connect to your form handler (e.g. Formspree, HubSpot, or your CRM)
  form.querySelector('.form-ok').style.display = 'block';
  form.querySelector('button[type=submit]').disabled = true;
});
