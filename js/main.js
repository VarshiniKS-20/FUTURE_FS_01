
const cur   = document.getElementById('cur');
const cring = document.getElementById('cring');
document.addEventListener('mousemove', e => {
  cur.style.left   = e.clientX + 'px';
  cur.style.top    = e.clientY + 'px';
  cring.style.left = e.clientX + 'px';
  cring.style.top  = e.clientY + 'px';
});


window.addEventListener('scroll', () => {
  document.getElementById('mainNav')
    .classList.toggle('scrolled', window.scrollY > 40);
});


const ham = document.getElementById('ham');
const mOv = document.getElementById('mOv');
const mDr = document.getElementById('mDr');
function toggleDrawer(open) {
  mOv.classList.toggle('open', open);
  mDr.classList.toggle('open', open);
}
ham.addEventListener('click', () => toggleDrawer(!mDr.classList.contains('open')));
mOv.addEventListener('click', () => toggleDrawer(false));
document.querySelectorAll('.ml').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));


const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .rev-l, .rev-r').forEach(el => revObs.observe(el));


document.querySelectorAll('.reveal, .rev-l, .rev-r').forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
    el.classList.add('on');
  }
});

const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(f => {
        f.style.width = f.dataset.w;
      });
      skObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

const skGrid = document.getElementById('skGrid');
if (skGrid) skObs.observe(skGrid);


document.querySelectorAll('.filt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.pcard').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});


document.getElementById('cForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✅ Message Sent!';
  btn.style.background = 'var(--accent)';
  this.reset();
  setTimeout(() => {
    btn.textContent = 'Send Message ✉️';
    btn.style.background = '';
  }, 4000);
});
