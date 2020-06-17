import superagent from 'superagent'

const openDoor = cardId => {
  const token = localStorage.getItem('token')
  return superagent
          .post('/activity/web')
          .send({ cardId })
          .set('Bearer', token)
}

export default openDoor
