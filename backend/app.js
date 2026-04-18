// Je démarre le serveur (structure proche de la demo du prof).
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = 3000

app.use(cors({ origin: '*' }))
app.use(express.json())

// Servir le frontend statique
app.use(express.static(path.join(__dirname, '..', 'frontend')))

// Charger le routeur (routes définies telles que /todos...)
app.use(require('./router/todos'))

app.listen(PORT, () => console.log('Serveur démarré sur le port', PORT))
