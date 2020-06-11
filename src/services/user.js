import superagent from 'superagent'

const getAllUsers = token => {
  return superagent.get('/user').set('Bearer', token)
}

const addNewUser = (token, user) => {
  return superagent.post('/user').set('Bearer', token).send(user)
}

const editUser = (token, cardId, user) => {
  return superagent.put('/user/' + cardId).set('Bearer', token).send(user)
}

export default { getAllUsers, addNewUser, editUser }