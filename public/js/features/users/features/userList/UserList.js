import UserCard from './UserCard.js'

const UserList = () => {
  let user = {
    displayName: 'Louis Kelly',
    photoURL: 'https://eu.ui-avatars.com/api/?background=random&name=Louis+Korkery',
    email: 'louis.kelly1@hotmail.com',
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