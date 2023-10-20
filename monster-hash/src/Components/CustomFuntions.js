export const AddToFavs = async (userId, card) => {
  //save to db
  const url = "/fav"
  const data = { id: userId, card: card }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  await fetch(url, options)
}


//search for cards on DB
export const FindCards = async (find) => {
  const url = "/search"
  const quey = { find: find }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quey)
  }
  const req = await fetch(url, options)
  const res = await req.json()

  return res
}

export const GetUserData = async (id) => {
  const url = "/getUserData"
  const data = { id: id }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const req = await fetch(url, options)
  const res = await req.json()
  console.log('res', res)
  return res
}








