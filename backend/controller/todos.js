const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, '..', 'data.json')

function readTodos() {
  try {
    const s = fs.readFileSync(DATA_FILE, 'utf8')
    const data = JSON.parse(s || '{}')
    return Array.isArray(data.todos) ? data.todos : []
  } catch (e) {
    return []
  }
}

function writeTodos(todos) {
  try {
    const data = { todos: todos }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch (e) {
    throw new Error("impossible d'écrire les données")
  }
}

const getAllTodos = (req, res) => {
  const data = readTodos()
  res.json(data)
}

const getTodoById = (req, res) => {
  const id = Number(req.params.id)
  const todos = readTodos()
  const t = todos.find(x => x.id === id)
  if (!t) return res.status(404).json({ message: 'tache non trouvée' })
  res.json(t)
}

const createTodo = (req, res) => {
  const titre = req.body.titre
  if (!titre) return res.status(400).json({ message: 'titre manquant' })
  const todos = readTodos()
  const item = { id: Date.now(), titre: titre, terminee: false }
  todos.push(item)
  try {
    writeTodos(todos)
    res.status(201).json(item)
  } catch (e) {
    res.status(500).json({ message: "erreur serveur : impossible d'enregistrer" })
  }
}

const updateTodo = (req, res) => {
  const id = Number(req.params.id)
  const todos = readTodos()
  const i = todos.findIndex(t => t.id === id)
  if (i === -1) return res.status(404).json({ message: 'tache non trouvée' })
  if (req.body.titre !== undefined) todos[i].titre = req.body.titre
  if (req.body.terminee !== undefined) todos[i].terminee = req.body.terminee
  try {
    writeTodos(todos)
    res.json(todos[i])
  } catch (e) {
    res.status(500).json({ message: "erreur serveur : impossible d'enregistrer" })
  }
}

const deleteTodo = (req, res) => {
  const id = Number(req.params.id)
  const todos = readTodos()
  const i = todos.findIndex(t => t.id === id)
  if (i === -1) return res.status(404).json({ message: 'tache non trouvée' })
  todos.splice(i, 1)
  try {
    writeTodos(todos)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ message: "erreur serveur : impossible d'enregistrer" })
  }
}

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo }
