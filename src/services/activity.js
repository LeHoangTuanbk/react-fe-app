import superagent from 'superagent'

const getAllActivity = () => {
  const token = localStorage.getItem('token')
  return superagent.get('/activity').set('Bearer', token)
}

const getUserActivity = (cardId) => {
  return superagent.get('/activity/' + cardId).set('Bearer', token)
}

export default { getAllActivity, getUserActivity }
