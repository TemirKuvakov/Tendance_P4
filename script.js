// Бургер-меню
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// Модальное окно
const modal = document.getElementById('modal');
const ctaBtn = document.querySelector('.cta-btn');
const modalClose = document.querySelector('.modal-close');
const form = document.querySelector('.modal-form');

// Открытие модалки
ctaBtn.addEventListener('click', () => {
    modal.showModal();
    modal.setAttribute('aria-hidden', 'false');
});

// Закрытие модалки
modalClose.addEventListener('click', () => {
    modal.close();
    modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('close', () => {
    modal.setAttribute('aria-hidden', 'true');
});

// Закрытие по ESC и клику вне модалки
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.open) {
        modal.close();
    }
});

// Отправка формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    modal.close();
});

// Переключатель темы
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
    
});

// Аккордеон
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        
        // Закрыть все остальные
        document.querySelectorAll('.accordion-panel').forEach(p => {
            if (p !== panel) {
                p.hidden = true;
                p.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle текущий
        button.setAttribute('aria-expanded', !expanded);
        panel.hidden = expanded;
        panel.toggleAttribute('open');
    });
});

