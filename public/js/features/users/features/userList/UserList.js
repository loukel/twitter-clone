import UserCard from './UserCard.js'

const UserList = () => {
  let user = {
    id: '1',
    displayName: 'Louis Kelly',
    photoURL: 'https://eu.ui-avatars.com/api/?background=random&name=Louis+Korkery',
    email: 'louis.kelly1@hotmail.com',
  }

  window.goToUser = id => {
    fetch('/')
      .then(() => {
        window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?userId=${id}`))
        window.rerender()
      })
      .catch(error => {
        console.error(error)
        console.error('Server has disconnected!')
        alert('Server has disconnected!')
      })
  }

  return `
  <div class='flex justify-center mt-6'>
    <div class="grid grid-cols-3 gap-6">
      ${UserCard(user)}
      ${UserCard(user)}
      ${UserCard(user)}
      ${UserCard(user)}
      ${UserCard(user)}
    </div>
  </div>
  `
}

export default UserList;