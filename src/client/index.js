import config from '../config';

export const getGame = async (id) => {
  const response = await fetch(`/game/${id}`)
  return await response.json()
}

export const postGame = async (gameDetails) => {
  const response = await fetch(`http://${config.baseUrl}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameDetails)
  })
  return await response.json()
}

export const putGame = async (id) => {
  const response = await fetch(`http://${config.baseUrl}/games/${id}`, {
    method: 'PUT'
  })
  return await response.json()
}

export const patchGame = async (id, gameDetails) => {
  const response = await fetch(`http://${config.baseUrl}/games/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameDetails)
  })
  return await response.json()
}

export const deleteGame = async (id) => {
  const response = await fetch(`http://${config.baseUrl}/games/${id}`, {
    method: 'DELETE'
  })
  return await response.json()
}