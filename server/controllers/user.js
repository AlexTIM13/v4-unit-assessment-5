const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { username, password} = req.body

    // Check if the user alredy exists in the database
    const existingUser = await db.find_user_by_username({username:username})
    if(existingUser[0]) {
      return res.status(400).send('Username alredy exist')
    }

    // Hash ans salt the user password, and insert their info into the db
    let salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.create_user({username, hash})

    // Take the newly generated user, and place them on the session, and send them to the client
    req.session.user = newUser[0]
    req.status(201).send(req.session.user)
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    // check if the user exist
    const existingUser = await db.check_user({username})
    if(!existingUser[0]) {
      return res.status(404).send('User not found')
    }

    // Make sure that the password submitted matches the db hash
    const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
    if(!isAuthenticated) {
      return res.status(401).send('Password is incorrect')
    }

    // Place the user on session and send back to client
    req.session.user = existingUser[0]
    return res.status(202).send(req.session.user) 
  },

  logout: (req, res) => {
    req.session.destroy ()
    return res.sendStatus(200)
  }
}

