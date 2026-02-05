const supabase = require('../config/supabase')
const { v4 } = require('uuid')

exports.createTodo = async (req, res) => {
  const { title } = req.body

  const { error } = await supabase
    .from('todo')
    .insert([{ id: v4(), title, userId: req.user.userId }])

  if (error)
    return res.status(400).json({ message: error.message })

  res.status(201).json({ message: 'Todo created' })
}

exports.getTodos = async (req, res) => {
  const { data } = await supabase
    .from('todo')
    .select('*')
    .eq('userId', req.user.userId)

  res.json(data)
}

exports.updateTodo = async (req, res) => {
  const { title, completed } = req.body

  const { data } = await supabase
    .from('todo')
    .select('*')
    .eq('id', req.params.id)
    .eq('userId', req.user.userId)

  if (!data.length)
    return res.status(403).json({ message: 'Unauthorized' })

  await supabase
    .from('todo')
    .update({ title, completed })
    .eq('id', req.params.id)

  res.json({ message: 'Todo updated' })
}

exports.deleteTodo = async (req, res) => {
  const { data } = await supabase
    .from('todo')
    .select('*')
    .eq('id', req.params.id)
    .eq('userId', req.user.userId)

  if (!data.length)
    return res.status(403).json({ message: 'Unauthorized' })

  await supabase
    .from('todo')
    .delete()
    .eq('id', req.params.id)

  res.json({ message: 'Todo deleted' })
}
