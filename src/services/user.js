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

const deleteUser = (cardId) => {
  const token = localStorage.getItem('token')
  return superagent.delete('/user/' + cardId).set('Bearer', token)
}

const deactiveUser = (cardId) => {
  const token = localStorage.getItem('token')
  return superagent.delete('/user/' + cardId + '/deactive').set('Bearer', token)
}

export default { getAllUsers, addNewUser, editUser, deleteUser, deactiveUser }
