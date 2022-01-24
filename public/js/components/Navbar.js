import {
  getAuth,
  signOut,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import "../firebase.js"

// Navbar modified from https://flowbite.com/docs/components/navbar/ 
const Navbar = (user) => {
  const auth = getAuth()

  window.toggleUserDropDown = () => {
    document.getElementById('dropdown').classList.toggle('hidden')
  }

  window.signOut = () => {
    signOut(auth).then(() => {
        window.rerender()
      })
      .catch((error) => {
        console.error(`Problem logging you out:${error}`)
      })
  }

  return `
    <!-- Navbar modified from https://flowbite.com/docs/components/navbar/ -->
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a onClick='goHome()' class="flex cursor-pointer">
          <span class="ml-4 self-center text-lg font-semibold whitespace-nowrap dark:text-white">social media</span>
        </a>
        <div class="flex items-center md:order-2">
          ${user 
              ? `
                  <div class='hidden md:block'>
                    <button id="dropdownButton" onClick='toggleUserDropDown()' type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" type="button" data-dropdown-toggle="dropdown">
                      <img class="w-10 h-10 rounded-full" src="${user.photoURL}" alt="user photo">
                    </button>
                    <!-- Dropdown menu -->
                    <div class="hidden absolute top-10 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                      <div class="py-3 px-4">
                        <span class="block text-sm text-gray-900 dark:text-white">${user.displayName}</span>
                        <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">${user.email}</span>
                      </div>
                      <ul class="py-1" aria-labelledby="dropdown">
                        <li>
                          <a onClick="goToUser('${user.uid}')" class="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">profile</a>
                        </li>
                        <li>
                          <a onClick='signOut()' class="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">sign out</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class='block md:hidden flex'>
                    <a onClick='signOut()' class="pill cursor-pointer block mx-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</a>
                    <button onClick="goToUser('${user.uid}')" type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                      <img class="w-10 h-10 rounded-full" src="${user.photoURL}" alt="user photo">
                    </button>
                  </div>
                `
              : `
              <div class='justify-between'>
                <button class='pill pill-blue' onClick='showLoginModal()'>
                  login
                </button>
                <button class='pill pill-blue' onClick='showRegisterModal()'>
                  register
                </button>
              </div>
              `
            }
          </div>
        </div>
      </div>
    </nav>  
  `
}

export default Navbar