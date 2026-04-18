// je m'occupe du frontend.
// Je fais : charger, ajouter, modifier, supprimer.
const API = 'http://localhost:3000/todos'

async function load() {
  try {
    const r = await fetch(API)
    if (!r.ok) throw 'erreur'
    show(await r.json())
  } catch (e) {
    err(e)
  }
}

function show(todos) {
  const L = document.getElementById('liste-todos')
  const no = document.getElementById('aucune-tache')
  L.innerHTML = ''
  if (!todos.length) { no.style.display = 'block'; return }
  no.style.display = 'none'
  todos.forEach(x => {
    const li = document.createElement('li')
    const s = document.createElement('span')
    const i = document.createElement('input')
    const b1 = document.createElement('button')
    const b2 = document.createElement('button')
    const b3 = document.createElement('button')

    s.textContent = x.titre
    s.className = 'tache-titre' + (x.terminee ? ' terminee' : '')
    s.onclick = () => toggle(x)

    i.type = 'text'
    i.className = 'input-modifier'
    i.value = x.titre
    // cacher l'input et le bouton valider par défaut
    i.style.display = 'none'

    b1.textContent = 'M'
    b1.onclick = () => { s.style.display = 'none'; i.style.display = 'inline-block'; b1.style.display = 'none'; b2.style.display = 'inline-block'; i.focus() }

    b2.textContent = 'V'
    // bouton valider caché par défaut
    b2.style.display = 'none'
    b2.onclick = () => edit(x.id, i.value)

    b3.textContent = 'X'
    b3.onclick = () => del(x.id)

    li.append(s, i, b1, b2, b3)
    L.append(li)
  })
}

async function add() {
  const v = document.getElementById('input-nouvelle-tache').value.trim()
  if (!v) return err('vide')
  try {
    const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ titre: v }) })
    if (!r.ok) throw await r.json()
    document.getElementById('input-nouvelle-tache').value = ''
    load()
  } catch (e) { err(e.message || e) }
}

async function edit(id, t) {
  if (!t.trim()) return err('vide')
  try {
    const r = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ titre: t.trim() }) })
    if (!r.ok) throw await r.json()
    load()
  } catch (e) { err(e.message || e) }
}

async function toggle(todo) {
  try {
    await fetch(`${API}/${todo.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ terminee: !todo.terminee }) })
    load()
  } catch (e) { err(e.message || e) }
}

async function del(id) {
  try { await fetch(`${API}/${id}`, { method: 'DELETE' }); load() } catch (e) { err(e.message || e) }
}

function err(m) {
  const e = document.getElementById('message-erreur')
  // Normaliser le message
  let msg = ''
  if (!m) msg = 'Erreur inconnue'
  else if (typeof m === 'string') msg = m
  else if (m.message) msg = m.message
  else msg = JSON.stringify(m)

  // Traductions simples et claires
  if (msg === 'vide') msg = 'Le champ est vide'
  if (msg === 'titre manquant') msg = "Le titre est manquant"

  e.textContent = msg
  e.style.display = 'block'
  // Masquer après 4 secondes
  clearTimeout(err._t)
  err._t = setTimeout(() => { e.style.display = 'none' }, 4000)
}

document.getElementById('input-nouvelle-tache').addEventListener('keydown', e => { if (e.key === 'Enter') add() })
load()
