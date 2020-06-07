import superagent from 'superagent'

const getAllUsers = token => {
  return superagent.get('/user').set('Bearer', token)
}

export default { getAllUsers }