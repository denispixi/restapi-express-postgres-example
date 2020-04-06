// @ts-check
const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'test',
  port: 5432
})

const getNotes = async (req, res) => {
  const { rows } = await pool.query('select * from notes order by id')
  console.table(rows)
  res.json(rows)
}

const createNote = async (req, res) => {
  console.log(req.body)
  const { title, description } = req.body
  const sentence = 'INSERT INTO notes(title, description) VALUES($1, $2) RETURNING *'
  const values = [title, description]
  try {
    const { rows } = await pool.query(sentence, values)
    console.table(rows)
    res.status(201).json({ insertedRows: rows })
  } catch (err) {
    console.log('error: ', err.stack)
    res.status(500).json({ error: err.stack })
  }
}

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params
    if (!Number.isInteger(parseInt(id)))
      return res.status(400).json({ message: "invalid note id" })

    const sentence = 'select * from notes where id = $1'
    const { rows } = await pool.query(sentence, [id])
    console.table(rows)
    if (rows.length > 0)
      res.json(rows[0])
    else
      res.status(404).json({ message: "Note not found!!" })
  } catch (err) {
    console.log('error: ', err.stack)
    res.status(500).json({ error: err.stack })
  }
}

const deleteNoteById = async (req, res) => {
  const { id } = req.params
  const sentence = 'delete from notes where id = $1 returning *'
  try {
    if (!Number.isInteger(parseInt(id)))
      return res.status(400).json({ message: "invalid note id" })
    const { rows } = await pool.query(sentence, [id])
    console.table(rows)
    res.json({ deletedRows: rows })
  } catch (err) {
    console.log('error: ', err.stack)
    res.status(500).json({ error: err.stack })
  }
}

const updateNoteById = async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body
  const sentence = `
    update notes set
      title = coalesce($1, title),
      description = coalesce($2, description)
    where id = $3
    returning *;  
  `
  try {
    if (!Number.isInteger(parseInt(id)))
      return res.status(400).json({ message: "invalid note id" })
    const { rows } = await pool.query(sentence, [title, description, id])
    console.table(rows)
    res.json({ updatedRows: rows })
  } catch (err) {
    console.log('error: ', err.stack)
    res.status(500).json({ error: err.stack })
  }
}

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  deleteNoteById,
  updateNoteById,
}