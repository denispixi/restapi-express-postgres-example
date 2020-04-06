// @ts-check
const { Router } = require('express')
const { getNotes, createNote, getNoteById, deleteNoteById, updateNoteById } = require('../controllers')

const router = Router()

router.get('/notes', getNotes)
router.get('/notes/:id', getNoteById)
router.post('/notes', createNote)
router.delete('/notes/:id', deleteNoteById)
router.patch('/notes/:id', updateNoteById)


module.exports = router