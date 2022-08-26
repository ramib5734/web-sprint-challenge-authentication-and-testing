const router = require('express').Router();
const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/index') 

const { checkUserNameUnique, checkUserNameExists, checkUserBody } = require('./middleware')

router.post('/register', checkUserBody, checkUserNameUnique, async (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8) //DO NOT EXCEED 2^8 ROUNDS OF HASHING!
  const user = { username, password: hash }
  try {
    const newUserRec = await Users.add(user)
    res.status(201).json(newUserRec)
  } catch (error) {
    next(error)
  }
});

router.post('/login', checkUserBody, checkUserNameExists, (req, res, next) => {
  const user = req.user
  const { password } = req.body
  const validCreds = bcrypt.compareSync(password, user.password)

  const generateToken = user => {
    const payload = {
      subject: user.id,
      username: user.username,
    }
    const options = {
      expiresIn: '1d'
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }

  if (validCreds) {
    res.status(200).json({
      message: `welcome, ${user.username}`,
      token: generateToken(user)
    })
  } else {
    next({ status: 401, message: 'invalid credentials' })
  }
});

module.exports = router;