🍽️ MyManager – Système de Gestion Backoffice pour Restaurant

Une application backoffice complète destinée à la gestion des opérations d’un restaurant, développée en JavaScript natif (Vanilla JS), HTML5 et CSS3.

👥 Membres de l’Équipe

[REDA_TAII] – Numéro étudiant : [ID] – [Email]

[MOUNIR_RAJAYI] – Numéro étudiant : [ID] – [Email]

[SALMA_KARIM] – Numéro étudiant : [ID] – [Email]

📋 Description du Projet

MyManager est une application backoffice de gestion de restaurant permettant aux administrateurs de gérer efficacement les plats, les tables, les employés, les réservations et les commandes.
L’application propose une interface responsive, des fonctionnalités CRUD complètes et un tableau de bord interactif avec plusieurs visualisations de données.

🎯 Fonctionnalités
Fonctionnalités Principales

✅ 5 Entités CRUD :

Plats – Gestion du menu avec catégories et prix

Tables – Suivi de la disponibilité et de la capacité des tables

Employés – Gestion du personnel et des rôles

Réservations – Gestion des réservations clients

Commandes – Traitement et suivi des commandes

✅ Dashboard avec 6 graphiques :

Diagramme circulaire (Pie Chart) : Répartition des plats par catégorie

Diagramme en anneau (Doughnut Chart) : Statut des tables

Graphique linéaire (Line Chart) : Évolution des commandes dans le temps

Diagramme polaire (Polar Area Chart) : Statut des réservations

Diagramme en barres horizontales : Revenus par plat

Diagramme en barres : Activité des employés

✅ Fonctionnalités Avancées :

🔐 Système de connexion/déconnexion (admin / admin)

🔍 Recherche et filtrage des données

📊 Tri sur plusieurs colonnes

📄 Export des données en CSV

📑 Export des détails en PDF

🌐 Internationalisation (Anglais, Français, Arabe)

📱 Design entièrement responsive

⏱️ Pagination des tableaux

✅ Validation des formulaires

🗑️ Fenêtres modales de confirmation de suppression

🛠️ Technologies Utilisées
Technologies Principales

HTML5 – Structure et balisage sémantique

CSS3 – Mise en forme moderne (Flexbox, Grid)

JavaScript Natif (ES6+) – Logique et interactions

Bibliothèques & Outils

Bootstrap 5.3.3 – Design responsive et composants UI

Chart.js 4.4.0 – Graphiques et visualisation de données

jsPDF 2.5.1 – Génération de fichiers PDF

Outils de Développement

Git – Gestion de versions

GitHub – Hébergement du repository

VS Code – Éditeur de code

Live Server – Serveur de développement local

📁 Structure du Projet
MyManager/
├── index.html # Point d’entrée (redirection vers login)
├── login.html # Page de connexion
├── dashboard.html # Tableau de bord principal
├── data/
│ └── db.json # Base de données simulée
├── assets/
│ ├── css/
│ │ └── style.css # Styles personnalisés
│ ├── js/
│ │ ├── auth.js # Authentification
│ │ ├── dashboard.js # Graphiques du dashboard
│ │ ├── crud-dishes.js # CRUD des plats
│ │ ├── i18n.js # Internationalisation
│ │ └── utils.js # Fonctions utilitaires
│ └── images/
│ └── logo.png # Logo de l’application
├── pages/
│ ├── dishes.html # Gestion des plats
│ ├── dishes-detail.html # Détails d’un plat
│ ├── tables.html # Gestion des tables
│ ├── employees.html # Gestion des employés
│ ├── reservations.html # Gestion des réservations
│ └── orders.html # Gestion des commandes
└── README.md # Documentation du projet

🚀 Installation et Lancement
Prérequis

Navigateur web moderne (Chrome, Firefox, Edge, Safari)

Extension Live Server pour VS Code (ou tout serveur local)

Étapes d’Installation

Cloner le repository

git clone https://github.com/redataii6/mymanager
cd mymanager

Lancer avec Live Server

Ouvrir le projet dans VS Code

Clic droit sur login.html

Sélectionner Open with Live Server

Connexion

Nom d’utilisateur : admin

Mot de passe : admin

⚠️ Important :
L’application doit être exécutée via un serveur web (et non file://) à cause des restrictions CORS liées au chargement du fichier JSON.

📊 Source des Données

Les données sont simulées à l’aide d’un fichier JSON local (data/db.json).
Dans un environnement réel, ces données seraient fournies par une API backend.

Exemple de Structure des Données
{
"dishes": [
{
"id": "dish_001",
"name": "Margherita",
"category": "Pizza",
"price": 55,
"isAvailable": true,
"createdAt": "2026-01-03"
}
]
}

🌐 Déploiement

L’application est déployée et accessible à l’adresse suivante :

Démo en ligne :
https://github.com/redataii6/mymanager

Déploiement avec GitHub Pages

Push du code sur GitHub

Aller dans Settings → Pages

Sélectionner la branche main

Sauvegarder et attendre le déploiement

📖 Guide d’Utilisation
Administrateur

Consultation du dashboard et des statistiques

Gestion complète des plats, tables, employés, réservations et commandes

Export des données (CSV / PDF)

Analyse via graphiques interactifs

🔧 Bonnes Pratiques de Développement

Code JavaScript modulaire et commenté

Respect des conventions de nommage

Design responsive

Compatibilité multi-navigateurs

🐛 Limites et Améliorations Futures
Limitations Actuelles

Données non persistantes après rafraîchissement

Absence de backend réel

Un seul rôle utilisateur (admin)

Améliorations Futures

Intégration d’une API backend

Authentification avancée (JWT)

Gestion des rôles et permissions

Notifications par email

Mode sombre

📄 Licence

Ce projet est réalisé à des fins académiques dans le cadre du module JavaScript & Développement Web à [Nom de l’Université].

🙏 Remerciements

Enseignant : [AHAJJAM Tarik]

Module : JavaScript & Web Development

Établissement : [EMSI]

Année Universitaire : 2025–2026

Dernière mise à jour : 03 Janvier 2026
Version : 1.2.0
Statut : ✅ Terminé
