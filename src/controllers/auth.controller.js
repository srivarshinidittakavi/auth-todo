const supabase = require('../config/supabase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const { error } = await supabase
    .from('user1')
    .insert([{ id: v4(), name, email, password: hashedPassword }])

  if (error)
    return res.status(400).json({ message: error.message })

  res.status(201).json({ message: 'User registered successfully' })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const { data: users } = await supabase
    .from('user1')
    .select('*')
    .eq('email', email)

  if (!users.length)
    return res.status(401).json({ message: 'Invalid credentials' })

  const user = users[0]

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
}
