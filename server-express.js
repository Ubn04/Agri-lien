const express = require('express');
const path = require('path');
const fs = require('fs');

// Créer l'app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Route principale pour afficher l'application Agri-Lien
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agri-Lien - Plateforme Agricole du Bénin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#22c55e',
                        secondary: '#16a34a'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <span class="text-2xl font-bold text-primary">🌾 Agri-Lien</span>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-700 hover:text-primary">Accueil</a>
                    <a href="#" class="text-gray-700 hover:text-primary">Marketplace</a>
                    <a href="#" class="text-gray-700 hover:text-primary">À propos</a>
                    <a href="/login" class="bg-primary text-white px-4 py-2 rounded-md">Connexion</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Connecter les fermiers et acheteurs du Bénin
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
                Une plateforme moderne pour révolutionner l'agriculture béninoise
            </p>
            <div class="space-x-4">
                <button class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                    Commencer maintenant
                </button>
                <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary">
                    En savoir plus
                </button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Fonctionnalités principales
                </h2>
                <p class="text-xl text-gray-600">
                    Tout ce dont vous avez besoin pour réussir dans l'agriculture moderne
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Farmers -->
                <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">👨‍🌾</div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Pour les Fermiers</h3>
                    <p class="text-gray-600">Vendez vos produits directement, gérez vos stocks et suivez vos commandes en temps réel.</p>
                    <a href="/farmer" class="inline-block mt-4 text-primary font-semibold hover:underline">
                        Espace Fermier →
                    </a>
                </div>

                <!-- Buyers -->
                <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🛒</div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Pour les Acheteurs</h3>
                    <p class="text-gray-600">Accédez à des produits frais locaux et passez vos commandes facilement.</p>
                    <a href="/buyer" class="inline-block mt-4 text-primary font-semibold hover:underline">
                        Espace Acheteur →
                    </a>
                </div>

                <!-- Logistics -->
                <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🚚</div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Logistique</h3>
                    <p class="text-gray-600">Gestion optimisée des livraisons et de la chaîne d'approvisionnement.</p>
                    <a href="/logistics" class="inline-block mt-4 text-primary font-semibold hover:underline">
                        Espace Logistique →
                    </a>
                </div>

                <!-- USSD -->
                <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">📱</div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-900">Interface USSD</h3>
                    <p class="text-gray-600">Accès par téléphone mobile via USSD pour tous les utilisateurs.</p>
                    <a href="/ussd" class="inline-block mt-4 text-primary font-semibold hover:underline">
                        Interface USSD →
                    </a>
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
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                    <h3 class="text-xl font-semibold mb-3">Inscription</h3>
                    <p class="text-gray-600">Créez votre compte fermier, acheteur ou logistique selon votre profil.</p>
                </div>
                <div class="text-center">
                    <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                    <h3 class="text-xl font-semibold mb-3">Connexion</h3>
                    <p class="text-gray-600">Connectez-vous avec d'autres acteurs de la chaîne agricole.</p>
                </div>
                <div class="text-center">
                    <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                    <h3 class="text-xl font-semibold mb-3">Échange</h3>
                    <p class="text-gray-600">Réalisez vos transactions et développez votre activité.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 text-center">
                <div>
                    <div class="text-4xl font-bold text-primary mb-2">1000+</div>
                    <div class="text-gray-600">Fermiers actifs</div>
                </div>
                <div>
                    <div class="text-4xl font-bold text-primary mb-2">500+</div>
                    <div class="text-gray-600">Acheteurs</div>
                </div>
                <div>
                    <div class="text-4xl font-bold text-primary mb-2">50+</div>
                    <div class="text-gray-600">Produits</div>
                </div>
                <div>
                    <div class="text-4xl font-bold text-primary mb-2">99%</div>
                    <div class="text-gray-600">Satisfaction</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Prêt à rejoindre Agri-Lien ?
            </h2>
            <p class="text-xl mb-8 opacity-90">
                Rejoignez des milliers d'agriculteurs et d'acheteurs qui transforment l'agriculture au Bénin.
            </p>
            <div class="space-x-4">
                <button class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                    S'inscrire gratuitement
                </button>
                <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary">
                    Contactez-nous
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <span class="text-2xl font-bold text-primary">🌾 Agri-Lien</span>
                    <p class="mt-4 text-gray-300">
                        Connecter les fermiers et acheteurs pour une agriculture moderne au Bénin.
                    </p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Liens rapides</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="#" class="hover:text-white">Accueil</a></li>
                        <li><a href="/marketplace" class="hover:text-white">Marketplace</a></li>
                        <li><a href="/about" class="hover:text-white">À propos</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Espaces</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/farmer" class="hover:text-white">Fermiers</a></li>
                        <li><a href="/buyer" class="hover:text-white">Acheteurs</a></li>
                        <li><a href="/logistics" class="hover:text-white">Logistique</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Contact</h4>
                    <p class="text-gray-300">
                        Email: contact@agri-lien.bj<br>
                        Téléphone: +229 XX XX XX XX
                    </p>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                <p>&copy; 2026 Agri-Lien. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script>
        // Animation simple au chargement
        window.addEventListener('load', function() {
            console.log('🌾 Agri-Lien chargé avec succès !');
            
            // Animation des cartes de fonctionnalités
            const cards = document.querySelectorAll('.shadow-lg');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-pulse');
                    setTimeout(() => {
                        card.classList.remove('animate-pulse');
                    }, 1000);
                }, index * 200);
            });
        });
    </script>
</body>
</html>
  `);
});

// Routes pour les différentes sections
app.get('/farmer', (req, res) => {
    res.redirect('/farmer/dashboard');
});

app.get('/buyer', (req, res) => {
    res.redirect('/buyer/catalog');
});

app.get('/logistics', (req, res) => {
    res.redirect('/logistics/dashboard');
});

app.get('/admin', (req, res) => {
    res.redirect('/admin/dashboard');
});

app.get('/marketplace', (req, res) => {
    res.redirect('/marketplace');
});

// API de santé
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Agri-Lien',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        message: 'Serveur Agri-Lien opérationnel'
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`
🌾 ========================================
   ✅ Agri-Lien Server démarré !
   
   🌐 URL: http://localhost:${PORT}
   📊 API Health: http://localhost:${PORT}/api/health
   
   🚀 Plateforme agricole du Bénin
   📱 Interface complète disponible
🌾 ========================================
    `);
});

module.exports = app;