// Variable globale pour le thème
let isDark = false;

// Fonction pour afficher une page spécifique
function showPage(pageId) {
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour les boutons actifs dans la navbar
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white', 'shadow-lg', 'active');
    });
    
    // Scroll vers le haut de la page
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
    
    // Sauvegarder la page actuelle dans localStorage
    try {
        localStorage.setItem('currentPage', pageId);
    } catch (e) {
        console.log('localStorage non disponible');
    }
}

// Fonction pour basculer entre mode clair et sombre
function toggleTheme() {
    isDark = !isDark;
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDark) {
        // Activer le mode sombre
        body.classList.add('dark');
        body.classList.remove('bg-white', 'text-gray-900');
        body.classList.add('bg-gray-900', 'text-white');
        
        navbar.classList.remove('bg-white/95');
        navbar.classList.add('bg-gray-800/95');
        
        themeIcon.textContent = '☀️';
        
        // Changer les couleurs des cartes
        updateElementsForDarkMode(true);
        
    } else {
        // Activer le mode clair
        body.classList.remove('dark');
        body.classList.remove('bg-gray-900', 'text-white');
        body.classList.add('bg-white', 'text-gray-900');
        
        navbar.classList.remove('bg-gray-800/95');
        navbar.classList.add('bg-white/95');
        
        themeIcon.textContent = '🌙';
        
        // Revenir aux couleurs claires
        updateElementsForDarkMode(false);
    }
    
    // Sauvegarder la préférence de thème
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
        console.log('localStorage non disponible');
    }
}

// Fonction pour mettre à jour les éléments selon le thème
function updateElementsForDarkMode(dark) {
    const cards = document.querySelectorAll('.bg-gray-50');
    const textGray = document.querySelectorAll('.text-gray-600');
    const borders = document.querySelectorAll('.border-gray-200');
    const inputs = document.querySelectorAll('input, textarea');
    
    if (dark) {
        cards.forEach(card => {
            card.classList.remove('bg-gray-50');
            card.classList.add('bg-gray-800');
        });
        
        textGray.forEach(text => {
            text.classList.remove('text-gray-600');
            text.classList.add('text-gray-300');
        });
        
        borders.forEach(border => {
            border.classList.remove('border-gray-200');
            border.classList.add('border-gray-700');
        });
        
        inputs.forEach(input => {
            input.classList.remove('bg-white');
            input.classList.add('bg-gray-700', 'text-white');
        });
    } else {
        const darkCards = document.querySelectorAll('.bg-gray-800');
        const lightText = document.querySelectorAll('.text-gray-300');
        const darkBorders = document.querySelectorAll('.border-gray-700');
        
        darkCards.forEach(card => {
            card.classList.remove('bg-gray-800');
            card.classList.add('bg-gray-50');
        });
        
        lightText.forEach(text => {
            text.classList.remove('text-gray-300');
            text.classList.add('text-gray-600');
        });
        
        darkBorders.forEach(border => {
            border.classList.remove('border-gray-700');
            border.classList.add('border-gray-200');
        });
        
        inputs.forEach(input => {
            input.classList.remove('bg-gray-700', 'text-white');
            input.classList.add('bg-white');
        });
    }
}

// Fonction d'initialisation au chargement de la page
function initPortfolio() {
    // Restaurer la page précédente si elle existe
    try {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            showPage(savedPage);
        } else {
            showPage('home');
        }
        
        // Restaurer le thème précédent
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            toggleTheme();
        }
    } catch (e) {
        showPage('home');
    }
    
    // Ajouter l'animation de chargement
    document.body.classList.add('animate-fade-in');
    
    // Observer pour les animations au scroll
    setupScrollAnimations();
}

// Configuration des animations au scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observer tous les éléments avec une classe spéciale
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
}

// Fonction pour gérer le formulaire de contact
function handleContactForm() {
    const form = document.querySelector('#contact form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Validation simple
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            // Ici vous pouvez ajouter l'envoi réel du formulaire
            console.log('Formulaire soumis:', { name, email, message });
            alert('Message envoyé avec succès!');
            
            // Réinitialiser le formulaire
            form.reset();
        });
    }
}

// Fonction pour ajouter des effets de particules (optionnel)
function addParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)';
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Fonction pour le smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Fonction pour détecter si l'utilisateur est sur mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Fonction pour ajouter des tooltips
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.classList.add('tooltip');
    });
}

// Gestion du clavier pour l'accessibilité
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Échap pour fermer les modales
        if (e.key === 'Escape') {
            // Fermer les éléments modaux si nécessaire
        }
        
        // Navigation avec les flèches
        if (e.ctrlKey) {
            if (e.key === 'ArrowRight') {
                // Page suivante
            } else if (e.key === 'ArrowLeft') {
                // Page précédente
            }
        }
    });
}

// Fonction de debounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisation du scroll
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Ajouter des effets au scroll ici
            ticking = false;
        });
        ticking = true;
    }
});

// Gestion du resize de la fenêtre
window.addEventListener('resize', debounce(function() {
    // Actions lors du redimensionnement
    console.log('Fenêtre redimensionnée');
}, 250));

// Détection de la connexion internet
window.addEventListener('online', function() {
    console.log('Connexion internet restaurée');
});

window.addEventListener('offline', function() {
    console.log('Connexion internet perdue');
});

// Préchargement des images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialisé');
    initPortfolio();
    setupSmoothScroll();
    setupTooltips();
    setupKeyboardNavigation();
    handleContactForm();
    
    // Décommenter pour activer l'effet de particules
    // addParticleEffect();
    
    // Précharger les images
    preloadImages();
});

// Gestion du beforeunload
window.addEventListener('beforeunload', function() {
    // Sauvegarder l'état avant de quitter
    try {
        localStorage.setItem('lastVisit', new Date().toISOString());
    } catch (e) {
        console.log('localStorage non disponible');
    }
});

// Export des fonctions pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        toggleTheme,
        initPortfolio
    };
}