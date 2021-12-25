import "../firebase.js"
import FireIcon from "../resources/fireIcon.js"
import {
  getAuth,
  createUserWithEmailAndPassword,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"

// Navbar modified from https://flowbite.com/docs/components/navbar/ 
const Navbar = () => {
  const auth = getAuth()
  const user = null

  window.toggleUserDropDown = () => {
    document.getElementById('dropdown').classList.toggle('hidden')
  }

  window.login = () => {
    const email = 'louis.kelly2@hotmail.com'
    const password = 'password'
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
  }

  return `
    <!-- Navbar modified from https://flowbite.com/docs/components/navbar/ -->
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a onClick='goHome()' class="flex cursor-pointer">
          <!-- Icon from https://www.svgrepo.com/svg/280522/fire -->
          ${FireIcon()}
          <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">social media</span>
        </a>
        <div class="flex items-center md:order-2">
          ${user 
              ? `
                  <button id="dropdownButton" onClick='toggleUserDropDown()' type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" type="button" data-dropdown-toggle="dropdown">
                    <img class="w-8 h-8 rounded-full" src="http://lorempixel.com/640/480/nature" alt="user photo">
                  </button>
                  <!-- Dropdown menu -->
                  <div class="hidden absolute top-10 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                    <div class="py-3 px-4">
                      <span class="block text-sm text-gray-900 dark:text-white">Full Name</span>
                      <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">user@email.com</span>
                    </div>
                    <ul class="py-1" aria-labelledby="dropdown">
                      <li>
                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                      </li>
                      <li>
                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                      </li>
                      <li>
                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                      </li>
                    </ul>
                  </div>
                `
              : `
                <button onClick='toggleAuthModal()'>
                  Login/Register
                </button>
              `
            }
          </div>
        </div>
      </div>
    </nav>
  `
}

export default Navbar