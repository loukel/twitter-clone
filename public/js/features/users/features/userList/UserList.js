import {
  getUsers
} from '../../../../services/userApi.js'
import UserCard from './UserCard.js'

const UserList = async search => {
  let users = await getUsers(search)

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
      ${users.length == 0 ? `your search - '${search}' - did not match any users. :(` : ''}
      ${users.map(user => UserCard(user)).join('')}
    </div>
  </div>
  `
}

export default UserList;