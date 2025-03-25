# MatchMaking

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/) [![pnpm](https://img.shields.io/badge/pnpm-7.x-blue.svg)](https://pnpm.io/) [![ESLint](https://img.shields.io/badge/ESLint-8.x-orange.svg)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-2.x-yellow.svg)](https://prettier.io/)

> MatchMaking est un projet de site de rencontre entre gamers, imaginé dans le cadre d'une formation développeur web / web mobile.

---

## Table des matières

- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Scripts](#scripts)
- [Contributions](#contributions)

---

## Getting Started

Pour démarrer ce projet en local :

1. **Clonez le dépôt**  
   ```bash
   git clone git@github.com:DyBryck/match-making.git
   cd match-making
   ```

2. **Installez les dépendances**  
   Nous utilisons pnpm :
   ```bash
   pnpm install
   ```

3. **Configuration**  
   Créez un fichier `.env` à la racine (si nécessaire) et configurez les variables d'environnement.

4. **Lancer le projet**  
   Pour démarrer en mode développement :
   ```bash
   pnpm run dev
   ```

---

## Directory Structure

`├──` [src](./src)<br>
`│   ├──` [config](./src/config)<br>
`│   │   └──` [config.js](./src/config/config.js)<br>
`│   ├──` [controllers](./src/controllers)<br>
`│   │   ├──` [authController.js](./src/controllers/authController.js)<br>
`│   │   ├──` [memberController.js](./src/controllers/memberController.js)<br>
`│   │   └──` [postController.js](./src/controllers/postController.js)<br>
`│   ├──` [middlewares](./src/middlewares)<br>
`│   │   ├──` [authMiddleware.js](./src/middlewares/authMiddleware.js)<br>
`│   │   └──` [errorMiddleware.js](./src/middlewares/errorMiddleware.js)<br>
`│   ├──` [models](./src/models)<br>
`│   │   ├──` [member.js](./src/models/member.js)<br>
`│   │   ├──` [game.js](./src/models/game.js)<br>
`│   │   └──` [event.js](./src/models/event.js)<br>
`│   ├──` [repositories](./src/repositories)<br>
`│   │   └──` [memberRepository.js](./src/repositories/memberRepository.js)<br>
`│   ├──` [routes](./src/routes)<br>
`│   │   ├──` [authRoutes.js](./src/routes/authRoutes.js)<br>
`│   │   ├──` [memberRoutes.js](./src/routes/memberRoutes.js)<br>
`│   │   └──` [postRoutes.js](./src/routes/postRoutes.js)<br>
`│   ├──` [services](./src/services)<br>
`│   │   ├──` [authService.js](./src/services/authService.js)<br>
`│   │   └──` [memberService.js](./src/services/memberService.js)<br>
`│   ├──` [utils](./src/utils)<br>
`│   │   └──` [logger.js](./src/utils/logger.js)<br>
`│   ├──` [app.js](./src/app.js)<br>
`│   └──` [server.js](./src/server.js)<br>
`├──` [tests](./tests)<br>
`├──` [migrations](./migrations)<br>
`├──` [package.json](./package.json)<br>
`├──` [.env](./.env) *(non versionné)*<br>
`├──` [.gitignore](./.gitignore)<br>
`└──` [README.md](./README.md)

## Tech Stack

Ce projet utilise les technologies suivantes :

- **Node.js** – Environnement d'exécution JavaScript côté serveur
- **pnpm** – Gestionnaire de dépendances rapide et efficace
- **ES Modules** – Syntaxe moderne d'import/export (activée dans le package.json)
- **ESLint & Prettier** – Pour la qualité et le formatage du code
- **Husky, lint-staged, commitlint, commitizen** – Pour un workflow Git et des commits standardisés

---

## Scripts

Voici quelques scripts définis dans le fichier `package.json` :

- **`pnpm run dev`**
  Lance le serveur en mode développement.

- **`pnpm run lint`**
  Exécute ESLint sur l'ensemble du projet.

- **`pnpm run format`**
  Lance Prettier pour formater le code.

- **`pnpm commit`**
  Utilise Commitizen pour formuler des messages de commit standardisés.

_N'hésitez pas à consulter le package.json pour la liste complète des scripts._

---

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez le dépôt** et créez une branche dédiée pour votre fonctionnalité :  
   ```bash
   git checkout -b feature/nom-fonctionnalité dev
   ```

2. **Respectez le workflow GitFlow** :  
   - **dev** : branche d'intégration.
   - **feature/** : branche pour chaque nouvelle fonctionnalité.
   - **release/** et **hotfix/** seront créées en fonction des besoins.

3. **Utilisez Commitizen** pour vos commits :  
   Lancez `pnpm commit` ou `npx cz` afin de créer des messages de commit conformes aux [Conventional Commits](https://www.conventionalcommits.org/).

4. **Code Review & Pull Request**  
   Une fois vos changements prêts, ouvrez une Pull Request depuis votre branche feature vers **dev** pour revue.

5. **Respectez les conventions de code**  
   - Utilisez ESLint et Prettier pour garantir un code propre et bien formaté.
   - Vérifiez que vos commits passent la validation avec commitlint.
