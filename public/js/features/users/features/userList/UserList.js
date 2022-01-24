import {
  getUsers
} from '../../../../services/userApi.js'
import UserCard from './UserCard.js'

const UserList = async search => {
  let users = await getUsers(search)

  return `
  <div class='flex justify-center mt-3 text-xl font-medium'>${users.length == 0 ? `your search - '${search}' - did not match any users. :(` : `users found → ${users.length}`}</div>
  <div class='flex justify-center mt-3'>
    <div class="grid grid-cols-1 md:grid-cols-3  gap-6">
      ${users.map(user => UserCard(user)).join('')}
    </div>
  </div>
  `
}

export default UserList;