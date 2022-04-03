import config from '../config';

export const getGame = async (id) => {
  return await fetch(`http://${config.baseUrl}/games/${id}`)
}

export const postGame = async () => {
  const response = await fetch(`http://${config.baseUrl}/games`, {
    method: 'POST'
  })
  return response
}

export const putGame = async (id, gameDetails) => {
  const response = await fetch(`http://${config.baseUrl}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameDetails)

  })
  return response
}

export const deleteGame = async (id) => {
  const response = await fetch(`http://${config.baseUrl}/games/${id}`, {
    method: 'DELETE'
  })
  return response
}

export const joinGame = async () => {
  return await fetch(`http://${config.baseUrl}/games/join`)
}