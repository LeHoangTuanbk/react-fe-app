import superagent from 'superagent'

const login = (username, password) => {
  return superagent.post('/auth/login').send(username, password)
}

const me = token => {
  return superagent.get('/me').set('Bearer', token)
}

export default { login, me }