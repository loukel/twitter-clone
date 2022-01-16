// Modified from https://tailwindcomponents.com/component/tailwind-css-users-card-list

const UserCard = (user) => `
  <div class="py-3 sm:py-4 bg-white grow">
    <div class="flex items-center space-x-4 px-6">
        <div class="flex-shrink-0">
            <img class="w-12 h-12 rounded-full" src="${user.photoURL}" alt="Profile">
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-md font-medium text-gray-900 truncate dark:text-white">
                ${user.displayName}
            </p>
            <p class="text-md text-gray-500 truncate dark:text-gray-400">
                ${user.email}
            </p>
        </div>
    </div>
  </div>
  `

export default UserCard