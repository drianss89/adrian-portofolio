/* Adrian Surya Atmaja — Portfolio JS */

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// --- Burger / mobile menu ---
var burger  = document.getElementById('burger');
var navList = document.getElementById('nav-list');

burger.addEventListener('click', function () {
  burger.classList.toggle('open');
  navList.classList.toggle('open');
});

navList.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    burger.classList.remove('open');
    navList.classList.remove('open');
  });
});

// --- Active nav link on scroll ---
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('#nav-list a');

window.addEventListener('scroll', function () {
  var current = '';
  sections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.id;
    }
  });
  navLinks.forEach(function (a) {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}, { passive: true });

// --- Typing animation ---
var typeEl = document.getElementById('typeEl');
if (typeEl) {
  var words = ['Web Developer', 'IT Support', 'Fresh Graduate RPL', 'Problem Solver'];
  var wi = 0, ci = 0, deleting = false;

  function type() {
    var word = words[wi];
    if (deleting) {
      ci--;
    } else {
      ci++;
    }
    typeEl.textContent = word.slice(0, ci);

    var delay = deleting ? 60 : 100;

    if (!deleting && ci === word.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 800);
}

// --- Reveal on scroll ---
var revealEls = document.querySelectorAll('.reveal');

var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    // stagger delay based on sibling index
    var parent = entry.target.parentElement;
    var siblings = Array.from(parent.children).filter(function (c) {
      return c.classList.contains('reveal');
    });
    var idx = siblings.indexOf(entry.target);
    var delay = idx * 70;

    setTimeout(function () {
      entry.target.classList.add('in');

      // animate skill bars inside
      entry.target.querySelectorAll('.bar-fill').forEach(function (bar) {
        bar.style.width = bar.getAttribute('data-w') + '%';
      });
    }, delay);

    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealEls.forEach(function (el) {
  revealObs.observe(el);
});

// --- Skills bar animation on scroll ---
var skillSection = document.getElementById('skills');
if (skillSection) {
  var skillObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.bar-fill').forEach(function (bar) {
        bar.style.width = bar.getAttribute('data-w') + '%';
      });
      skillObs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  skillObs.observe(skillSection);
}

// --- Contact form ---
var contactForm = document.getElementById('contactForm');
var formOk = document.getElementById('formOk');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Mengirim...';
    btn.disabled = true;

    setTimeout(function () {
      contactForm.reset();
      btn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      formOk.classList.add('show');
      setTimeout(function () {
        formOk.classList.remove('show');
      }, 4000);
    }, 1200);
  });
}
