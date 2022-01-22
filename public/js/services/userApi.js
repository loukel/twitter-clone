const getUser = async id => {
  const user = await fetch(`/api/users/${id}`)
    .then(res => res.json())
    .catch(error => {
      console.error(error)
      return false
    })

  return user
}

const getUsers = async query => {
  const users = await fetch(`/api/users?query=${query}`)
    .then(res => res.json())
    .catch(error => {
      console.error(error)
      return false
    })

  return users
}

export {
  getUser,
  getUsers,
}