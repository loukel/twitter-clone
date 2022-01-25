import {
  getAuth,
  signOut,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import "../firebase.js"
import handshake from "../utils/handshake.js"

// Navbar modified from https://flowbite.com/docs/components/navbar/ 
const Navbar = (user) => {
  const auth = getAuth()

  window.signOut = () => {
    handshake(() => {
      signOut(auth).then(() => {
          window.rerender()
        })
        .catch((error) => {
          console.error(`Problem logging you out:${error}`)
        })
    })
  }

  return `
    <!-- Navbar modified from https://flowbite.com/docs/components/navbar/ -->
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a onClick='goHome()' class="flex cursor-pointer">
          <span class="ml-4 self-center text-lg font-semibold whitespace-nowrap dark:text-white">Social Media</span>
        </a>
        <div class="flex items-center md:order-2">
          ${user 
              ? `
                <div class='flex'>
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