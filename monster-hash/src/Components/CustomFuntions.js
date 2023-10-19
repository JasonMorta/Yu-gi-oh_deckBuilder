

export const AddToFavs = async (userId, cardId) => {
  //save to db
  const url = "/fav"
  const data = { id: userId, cardId: cardId }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  await fetch(url, options)
}



