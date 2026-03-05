#!/bin/bash

# Installation automatique de Docker et Docker Compose sur Ubuntu

echo "🚀 Installation de Docker et Docker Compose..."

# Mise à jour système
sudo apt update

# Installation des prérequis
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Ajouter la clé GPG officielle de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Ajouter le dépôt Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Mise à jour et installation Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER

echo "✅ Docker installé!"
echo "⚠️ IMPORTANT: Vous devez redémarrer votre session ou faire 'newgrp docker'"
echo ""
echo "🧪 Test Docker:"
echo "sudo docker run hello-world"
echo ""
echo "🧪 Test Docker Compose:"
echo "docker compose version"