const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agri-Lien - Plateforme Agricole du Bénin</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .header {
            padding: 20px 0;
            text-align: center;
        }
        .logo {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .tagline {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 40px;
        }
        .hero {
            text-align: center;
            padding: 60px 0;
        }
        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        .hero p {
            font-size: 1.1rem;
            margin-bottom: 40px;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding: 40px 0;
        }
        .feature {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px 20px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            display: block;
        }
        .feature h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
        }
        .feature p {
            opacity: 0.9;
            line-height: 1.5;
        }
        .status {
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 8px;
            margin-top: 40px;
            text-align: center;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            margin: 10px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            padding: 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            margin-top: 60px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">🌾 Agri-Lien</div>
            <div class="tagline">Connecter les fermiers et acheteurs du Bénin</div>
        </header>

        <main class="hero">
            <h1>Plateforme de connexion agricole</h1>
            <p>
                Agri-Lien facilite les échanges entre producteurs agricoles et acheteurs au Bénin. 
                Découvrez des produits frais, gérez vos commandes et développez votre activité agricole.
            </p>

            <div class="features">
                <div class="feature">
                    <span class="feature-icon">👨‍🌾</span>
                    <h3>Pour les Fermiers</h3>
                    <p>Vendez vos produits directement aux acheteurs, gérez vos stocks et suivez vos commandes en temps réel.</p>
                </div>
                <div class="feature">
                    <span class="feature-icon">🛒</span>
                    <h3>Pour les Acheteurs</h3>
                    <p>Accédez à des produits frais locaux, passez vos commandes et suivez vos livraisons facilement.</p>
                </div>
                <div class="feature">
                    <span class="feature-icon">🚚</span>
                    <h3>Logistique</h3>
                    <p>Système de gestion des livraisons et de la logistique pour optimiser la chaîne d'approvisionnement.</p>
                </div>
                <div class="feature">
                    <span class="feature-icon">📱</span>
                    <h3>Interface USSD</h3>
                    <p>Accès par téléphone mobile via USSD pour les utilisateurs sans smartphone.</p>
                </div>
            </div>

            <div class="status">
                <h3>🎉 Serveur Agri-Lien démarré avec succès !</h3>
                <p>Application Next.js en cours de développement</p>
                <p><strong>Port:</strong> 3000 | <strong>Environnement:</strong> Développement | <strong>Status:</strong> ✅ Opérationnel</p>
                
                <div style="margin-top: 20px;">
                    <a href="#" class="btn" onclick="location.reload()">🔄 Actualiser</a>
                    <a href="/api/health" class="btn">📊 Status API</a>
                </div>
            </div>
        </main>

        <footer class="footer">
            <p>&copy; 2026 Agri-Lien - Plateforme agricole du Bénin</p>
            <p style="opacity: 0.7; margin-top: 10px;">Développé avec Next.js, React et TypeScript</p>
        </footer>
    </div>

    <script>
        // Animation simple au chargement
        document.addEventListener('DOMContentLoaded', function() {
            const features = document.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.opacity = '0';
                    feature.style.transform = 'translateY(20px)';
                    feature.style.transition = 'all 0.6s ease';
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });
        });

        // Vérification périodique de la connexion
        setInterval(() => {
            fetch('/api/health')
                .then(response => {
                    if (response.ok) {
                        console.log('✅ Serveur opérationnel');
                    }
                })
                .catch(() => {
                    console.log('⚠️ Vérification serveur...');
                });
        }, 30000);
    </script>
</body>
</html>
    `);
  } else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'Agri-Lien',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page non trouvée</h1><p><a href="/">Retour à l\'accueil Agri-Lien</a></p>');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`
🌾 ================================
   Serveur Agri-Lien démarré !
   http://localhost:${PORT}
   
   Plateforme agricole du Bénin
   Prêt à recevoir des connexions
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