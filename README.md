# match-making

MatchMaking est un projet de site de rencontre entre gamers imaginé dans le cadre d'une formation développeur web / web mobile

L’idée serait de créer un réseau social dédié aux gamers où chaque membre peut créer et personnaliser son profil. Rassembler une communauté de passionnés de jeux vidéo autour de plusieurs fonctionnalités clés:

- **Gestion des membres et de leurs profils:**
  Les utilisateurs s’inscrivent, créent un profil et indiquent la liste des jeux auxquels ils jouent. Ils peuvent aussi suivre d’autres membres pour rester connectés.
- **Interaction autour des jeux vidéo:**
  Les membres peuvent suivre des jeux vidéo spécifiques et, via leurs posts, associer un jeu à leur contenu. Chaque post pourra, par exemple, rediriger vers une page dédiée au jeu.

- **Contenu et interactions sociales:**
  Les membres peuvent publier des posts (texte, images, vidéos) et commenter ceux des autres. Un système de réactions (like, love, etc.) permettra d’exprimer leur ressenti sur posts et commentaires. Chaque jeu et évènement aurait un salon textuel dédié.

Ce projet suit plusieurs règles pour garantir une qualité de code homogène et un workflow collaboratif efficace. Voici les principaux points à respecter :

1. Structure des branches (GitFlow)
   • main : contient le code de production, toujours stable.
   • develop : branche d’intégration où sont fusionnées les nouvelles fonctionnalités.
   • feature/ : pour chaque nouvelle fonctionnalité, créez une branche à partir de develop avec le format feature/[nom-fonctionnalité].
   • release/ et hotfix/ : utilisées pour préparer une nouvelle version ou corriger un bug en production (elles seront créées au besoin).

2. Workflow de commits et gestion des messages
   • Commitizen et Commitlint :
   Pour garantir la cohérence des messages de commit, nous utilisons Commitizen qui guide lors de la rédaction des messages selon le standard Conventional Commits.
   • Exemple d’usage : lancez npx cz ou git cz pour formuler vos commits.
   • Commitlint :
   Un hook Git (via Husky) vérifie que les messages respectent le format attendu. En cas de non-conformité, le commit est rejeté.

3. Qualité et formatage du code
   • ESLint :
   Pour assurer la qualité et détecter les erreurs, ESLint est utilisé. Toute modification doit être conforme aux règles définies.
   • Prettier :
   Pour un formatage cohérent, Prettier est intégré. L’outil s’exécute via lint-staged sur les fichiers modifiés avant chaque commit.
   • lint-staged & Husky :
   Les hooks pré-commit déclenchés par Husky exécutent lint-staged pour corriger et vérifier uniquement les fichiers mis en scène.
   Cela permet de garder un historique de commit propre et de respecter les standards de code.

4. Utilisation des ES Modules

Le projet est configuré pour utiliser les ES Modules (avec "type": "module" dans le package.json), ce qui permet d’utiliser la syntaxe moderne import/export dans l’ensemble du code.

5. Fichiers à ne pas versionner

Assurez-vous que votre fichier .gitignore contient au moins les éléments suivants pour éviter de versionner des fichiers indésirables :
• node_modules/
• .env
• dist/ ou build/ (si applicable)
• fichiers de logs (\*.log)
• fichiers spécifiques à votre IDE (par exemple, .vscode/)
