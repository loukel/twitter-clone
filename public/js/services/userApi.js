const getUser = async id => {
  const user = await fetch(`/api/users/${id}`)
    .then(res => res.json())
    .catch(error => {
      console.error(error)
      return {}
    })

  return user
}

const getUsers = async query => {
  const users = await fetch(`/api/users?query=${query}`)
    .then(res => res.json())
    .catch(error => {
      console.error(error)
      return []
    })

  return users
}

export {
  getUser,
  getUsers,
}