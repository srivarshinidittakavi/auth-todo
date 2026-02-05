const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller')

router.post('/todos', auth, createTodo)
router.get('/todos', auth, getTodos)
router.put('/todos/:id', auth, updateTodo)
router.delete('/todos/:id', auth, deleteTodo)

module.exports = router
