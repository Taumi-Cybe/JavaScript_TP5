**TP TodoApp — Rapport de rendu**

Je présente mon TP : une petite application Todo (frontend + backend).

**Structure :**

- [backend/app.js](backend/app.js) — serveur express
- [backend/router/todos.js](backend/router/todos.js) — routes
- [backend/controller/todos.js](backend/controller/todos.js) — logique CRUD
- [backend/data.json](backend/data.json) — données (fichier JSON)
- [frontend/index.html](frontend/index.html) — interface simple
- [frontend/script.js](frontend/script.js) — code client
- [package.json](package.json) et [package-lock.json](package-lock.json)

**Comment lancer (très simple)**

1. Ouvrir un terminal dans le dossier du projet :

```
cd "C:/Users/utili/Downloads/TP TodoApp"
```

2. Installer les dépendances (si besoin) :

```
npm install
```

3. Démarrer le serveur :

```
npm start
# ou
node backend/app.js
```

4. Ouvrir le frontend :[index.html](index.html) dans le navigateur.

**API (exemples)**

- `GET /todos` — liste des tâches
- `POST /todos` — créer : corps JSON `{ "titre": "ma tache" }`
- `PUT /todos/:id` — modifier : `{ "titre":..., "terminee":true|false }`
- `DELETE /todos/:id` — supprimer

Concernants les erreurs :

- Si le `titre` est manquant → 400 `{ "message": "titre manquant" }`
- Si l'élément n'existe pas → 404 `{ "message": "tache non trouvée" }`
- Si le serveur ne peut pas écrire le fichier → 500 `{ "message": "erreur serveur : impossible d'enregistrer" }`

**Tests que j'ai faits**

- POST → GET → PUT → DELETE : tous fonctionnent (CRUD testé).
- Test d'erreurs : POST sans titre (400), PUT id inconnu (404), écriture fichier simulée → 500.
