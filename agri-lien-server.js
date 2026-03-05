const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Serveur HTTP simple pour Agri-Lien
const server = http.createServer((req, res) => {
  // Configuration des headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gestion des routes
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route principale - Page d'accueil Agri-Lien
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHomePage());
  }
  // Route farmer
  else if (req.url.startsWith('/farmer')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getFarmerPage());
  }
  // Route buyer
  else if (req.url.startsWith('/buyer')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getBuyerPage());
  }
  // Route logistics
  else if (req.url.startsWith('/logistics')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLogisticsPage());
  }
  // Route admin
  else if (req.url.startsWith('/admin')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getAdminPage());
  }
  // Route marketplace
  else if (req.url.startsWith('/marketplace')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getMarketplacePage());
  }
  // API Health Check
  else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'Agri-Lien',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: 'Plateforme agricole du Bénin - Serveur opérationnel'
    }));
  }
  // 404 - Page non trouvée
  else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(get404Page());
  }
});

// Page d'accueil principale - Version fidèle à app/page.tsx
function getHomePage() {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agri-Lien - Plateforme Agricole du Bénin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: { 
                          50: '#f0fdf4',
                          100: '#dcfce7',
                          200: '#bbf7d0',
                          300: '#86efac',
                          400: '#4ade80',
                          500: '#22c55e', 
                          600: '#16a34a',
                          700: '#15803d',
                          800: '#166534',
                          900: '#14532d'
                        },
                        secondary: '#16a34a',
                        accent: '#f59e0b',
                        background: '#fafafa'
                    },
                    fontFamily: {
                        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.6s ease-in-out',
                        'slide-up': 'slideUp 0.6s ease-out',
                        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite'
                    }
                }
            }
        }
    </script>
    <style>
        * { font-family: 'Inter', sans-serif; }
        .page-transition { transition: all 0.3s ease; }
        .hover-scale:hover { transform: scale(1.02); transition: transform 0.3s ease; }
        .gradient-bg { background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%); }
        .hero-bg { 
            background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=1920&q=80');
            background-size: cover; 
            background-position: center; 
            background-attachment: fixed;
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-in-out; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-bounce-gentle { animation: bounceGentle 2s ease-in-out infinite; }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceGentle {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .shadow-custom {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center cursor-pointer" onclick="window.location.href='/'">
                    <span class="text-2xl font-bold text-primary-600">🌾 Agri-Lien</span>
                    <span class="ml-2 text-sm text-gray-600 hidden sm:block">Bénin</span>
                </div>
                <div class="hidden md:flex space-x-6">
                    <a href="/" class="text-gray-700 hover:text-primary-600 font-medium">Accueil</a>
                    <a href="/marketplace" class="text-gray-700 hover:text-primary-600 font-medium">Marketplace</a>
                    <a href="#about" class="text-gray-700 hover:text-primary-600 font-medium">À propos</a>
                    <a href="/login" class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Connexion</a>
                </div>
                <div class="md:hidden">
                    <button class="text-gray-700 hover:text-primary-600">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg text-white py-20 page-transition">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Connecter les fermiers<br>et acheteurs du Bénin
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Une plateforme moderne pour révolutionner l'agriculture béninoise et développer l'économie locale
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover-scale transition-all text-lg">
                    <i class="fas fa-rocket mr-2"></i>Commencer maintenant
                </button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all text-lg">
                    <i class="fas fa-play mr-2"></i>Voir la démo
                </button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Fonctionnalités principales
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Tout ce dont vous avez besoin pour réussir dans l'agriculture moderne au Bénin
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Farmers -->
                <div class="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover-scale transition-all cursor-pointer" onclick="window.location.href='/farmer'">
                    <div class="text-5xl mb-6 text-center">👨‍🌾</div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900 text-center">Espace Fermiers</h3>
                    <p class="text-gray-600 text-center mb-6">Vendez vos produits directement, gérez vos stocks et suivez vos commandes en temps réel.</p>
                    <div class="text-center">
                        <span class="text-primary-600 font-semibold hover:underline">
                            Accéder à l'espace →
                        </span>
                    </div>
                </div>

                <!-- Buyers -->
                <div class="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover-scale transition-all cursor-pointer" onclick="window.location.href='/buyer'">
                    <div class="text-5xl mb-6 text-center">🛒</div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900 text-center">Espace Acheteurs</h3>
                    <p class="text-gray-600 text-center mb-6">Accédez à des produits frais locaux et passez vos commandes facilement.</p>
                    <div class="text-center">
                        <span class="text-primary-600 font-semibold hover:underline">
                            Accéder à l'espace →
                        </span>
                    </div>
                </div>

                <!-- Logistics -->
                <div class="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover-scale transition-all cursor-pointer" onclick="window.location.href='/logistics'">
                    <div class="text-5xl mb-6 text-center">🚚</div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900 text-center">Logistique</h3>
                    <p class="text-gray-600 text-center mb-6">Gestion optimisée des livraisons et de la chaîne d'approvisionnement.</p>
                    <div class="text-center">
                        <span class="text-primary-600 font-semibold hover:underline">
                            Accéder à l'espace →
                        </span>
                    </div>
                </div>

                <!-- USSD -->
                <div class="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover-scale transition-all cursor-pointer" onclick="window.location.href='/ussd'">
                    <div class="text-5xl mb-6 text-center">📱</div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900 text-center">Interface USSD</h3>
                    <p class="text-gray-600 text-center mb-6">Accès par téléphone mobile via USSD pour tous les utilisateurs.</p>
                    <div class="text-center">
                        <span class="text-primary-600 font-semibold hover:underline">
                            Interface USSD →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How it Works -->
    <section class="bg-gray-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Comment ça fonctionne
                </h2>
                <p class="text-xl text-gray-600">Simple, efficace et accessible à tous</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="bg-primary-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">1</div>
                    <h3 class="text-xl font-semibold mb-4">Inscription</h3>
                    <p class="text-gray-600">Créez votre compte fermier, acheteur ou logistique selon votre profil professionnel.</p>
                </div>
                <div class="text-center">
                    <div class="bg-primary-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">2</div>
                    <h3 class="text-xl font-semibold mb-4">Connexion</h3>
                    <p class="text-gray-600">Connectez-vous avec d'autres acteurs de la chaîne agricole béninoise.</p>
                </div>
                <div class="text-center">
                    <div class="bg-primary-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">3</div>
                    <h3 class="text-xl font-semibold mb-4">Échange</h3>
                    <p class="text-gray-600">Réalisez vos transactions et développez votre activité agricole.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 text-center">
                <div class="p-6">
                    <div class="text-5xl font-bold text-primary-600 mb-2">1,250+</div>
                    <div class="text-gray-600 text-lg">Fermiers actifs</div>
                </div>
                <div class="p-6">
                    <div class="text-5xl font-bold text-primary-600 mb-2">850+</div>
                    <div class="text-gray-600 text-lg">Acheteurs</div>
                </div>
                <div class="p-6">
                    <div class="text-5xl font-bold text-primary-600 mb-2">120+</div>
                    <div class="text-gray-600 text-lg">Produits locaux</div>
                </div>
                <div class="p-6">
                    <div class="text-5xl font-bold text-primary-600 mb-2">98%</div>
                    <div class="text-gray-600 text-lg">Satisfaction</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="gradient-bg text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Prêt à rejoindre Agri-Lien ?
            </h2>
            <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Rejoignez des milliers d'agriculteurs et d'acheteurs qui transforment l'agriculture au Bénin grâce à notre plateforme.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover-scale transition-all text-lg">
                    <i class="fas fa-user-plus mr-2"></i>S'inscrire gratuitement
                </button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all text-lg">
                    <i class="fas fa-phone mr-2"></i>Contactez-nous
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <span class="text-2xl font-bold text-primary-500">🌾 Agri-Lien</span>
                    <p class="mt-4 text-gray-300 leading-relaxed">
                        Plateforme moderne pour connecter fermiers et acheteurs, révolutionner l'agriculture au Bénin.
                    </p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-6">Liens rapides</h4>
                    <ul class="space-y-3 text-gray-300">
                        <li><a href="/" class="hover:text-white transition-colors">Accueil</a></li>
                        <li><a href="/marketplace" class="hover:text-white transition-colors">Marketplace</a></li>
                        <li><a href="/about" class="hover:text-white transition-colors">À propos</a></li>
                        <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-6">Espaces utilisateurs</h4>
                    <ul class="space-y-3 text-gray-300">
                        <li><a href="/farmer" class="hover:text-white transition-colors">Espace Fermiers</a></li>
                        <li><a href="/buyer" class="hover:text-white transition-colors">Espace Acheteurs</a></li>
                        <li><a href="/logistics" class="hover:text-white transition-colors">Logistique</a></li>
                        <li><a href="/admin" class="hover:text-white transition-colors">Administration</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-6">Contact</h4>
                    <div class="text-gray-300 space-y-3">
                        <p><i class="fas fa-envelope mr-2"></i>contact@agri-lien.bj</p>
                        <p><i class="fas fa-phone mr-2"></i>+229 XX XX XX XX</p>
                        <p><i class="fas fa-map-marker-alt mr-2"></i>Cotonou, Bénin</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                <p>&copy; 2026 Agri-Lien. Tous droits réservés. Plateforme agricole du Bénin.</p>
            </div>
        </div>
    </footer>

    <script>
        // Animation et interactivité
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🌾 Agri-Lien - Application démarrée avec succès !');
            
            // Animation des statistiques au scroll
            const stats = document.querySelectorAll('[class*="text-5xl"]');
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-pulse');
                        setTimeout(() => {
                            entry.target.classList.remove('animate-pulse');
                        }, 2000);
                    }
                });
            }, observerOptions);
            
            stats.forEach(stat => observer.observe(stat));
            
            // Smooth scroll pour les liens internes
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });
        
        // Fonction pour tester la connexion API
        function checkAPI() {
            fetch('/api/health')
                .then(response => response.json())
                .then(data => {
                    console.log('✅ API Status:', data);
                })
                .catch(error => {
                    console.log('⚠️ API Check:', error);
                });
        }
        
        // Vérification API toutes les 30 secondes
        setInterval(checkAPI, 30000);
        checkAPI(); // Premier appel immédiat
    </script>
</body>
</html>
  `;
}

// Page 404
function get404Page() {
  return `
    <html><head><title>404 - Page non trouvée | Agri-Lien</title></head>
    <body style="font-family: Arial; text-align: center; padding: 50px;">
      <h1>🌾 Agri-Lien</h1>
      <h2>404 - Page non trouvée</h2>
      <p><a href="/" style="color: #22c55e;">Retour à l'accueil</a></p>
    </body></html>
  `;
}

// Pages des autres sections (placeholders)
function getFarmerPage() {
  return `<html><head><title>Espace Fermiers | Agri-Lien</title></head><body><h1>🌾 Espace Fermiers - Agri-Lien</h1><p><a href="/">← Retour accueil</a></p></body></html>`;
}

function getBuyerPage() {
  return `<html><head><title>Espace Acheteurs | Agri-Lien</title></head><body><h1>🛒 Espace Acheteurs - Agri-Lien</h1><p><a href="/">← Retour accueil</a></p></body></html>`;
}

function getLogisticsPage() {
  return `<html><head><title>Logistique | Agri-Lien</title></head><body><h1>🚚 Logistique - Agri-Lien</h1><p><a href="/">← Retour accueil</a></p></body></html>`;
}

function getAdminPage() {
  return `<html><head><title>Administration | Agri-Lien</title></head><body><h1>⚙️ Administration - Agri-Lien</h1><p><a href="/">← Retour accueil</a></p></body></html>`;
}

function getMarketplacePage() {
  return `<html><head><title>Marketplace | Agri-Lien</title></head><body><h1>🏪 Marketplace - Agri-Lien</h1><p><a href="/">← Retour accueil</a></p></body></html>`;
}

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`
🌾 ================================
   ✅ Serveur Agri-Lien démarré !
   
   🌐 URL: http://localhost:${PORT}
   📊 Health: http://localhost:${PORT}/api/health
   
   🚀 Plateforme agricole du Bénin
   📱 Interface complète disponible
   ⚡ Serveur Node.js natif
🌾 ================================
  `);
});

// Gestion gracieuse de l'arrêt
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur Agri-Lien...');
  server.close(() => {
    console.log('✅ Serveur fermé proprement');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('❌ Erreur non gérée:', err);
  process.exit(1);
});

module.exports = server;