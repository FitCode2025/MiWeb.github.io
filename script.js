// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initScrollAnimations();
    initBurgerMenu();
    initSmoothScroll();
    initHoverEffects();
    initFormValidation();
    initScrollProgress();
});

// Animaciones al scroll con Intersection Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-entrance').forEachforEach(el => observer.observe(el));
}


// Menú hamburguesa
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger?.addEventListener('click', () => {
        nav.classList.toggle('translate-x-full');
        nav.classList.toggle('opacity-0');
        burger.classList.toggle('burger-active');
    
        burger.querySelectorAll('div').forEach((line, index) => {
            line.classList.toggle(`burger-line-${index + 1}-active`);
        });
    });
}

// Smooth scroll para los enlaces
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }
            
        });
    });

    if(window.innerWidth < 768) {
        document.querySelector('.nav-links').classList.add('translate-x-full', 'opacity-0');
}



// Efectos hover para tarjetas
function initHoverEffects() {
    const cards = document.querySelectorAll('.hover-tilt');
    cards.forEach(card => {
        card.addEventListener('mousemove', tiltCard);
        card.addEventListener('mouseleave', resetCard);
    });


        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }

    function tiltCard(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        this.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    }
}

// Validación de formulario de contacto
function initFormValidation() {
    const form = document.querySelector('form');
    form?.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault();
        let isValid = true;

        fields.forEach(({ el, required, pattern }) => {
            el.classList.remove('input-error');
            
            if(required && !el.value.trim()) {
                isValid = false;
                el.classList.add('input-error');
            }
            
            if(pattern && !pattern.test(el.value)) {
                isValid = false;
                el.classList.add('input-error');
            }
        });

        if(isValid) {
            showNotification('✅ Mensaje enviado con éxito!');
            form.reset();
        }
    }


// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-xl transform translate-y-20 opacity-0 transition-all duration-300 text-sm md:text-base';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });

    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-purple-400 z-50';
    progressBar.style.width = '0%';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                var parent = elem.parentElement || head;
                parent.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
            console.log('Live reload enabled.');
            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
        }
    })();
}
else {
    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
}