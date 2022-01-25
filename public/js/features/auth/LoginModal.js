import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import handshake from "../../utils/handshake.js"
import validateEmail from '../../utils/validateEmail.js'

/*
 * Modal modifed from https://tailwindui.com/components/application-ui/overlays/modals
 * Alert modified from https://v1.tailwindcss.com/components/alerts
 */

const LoginModal = () => {
  const auth = getAuth()

  window.showLoginModal = () => {
    window.hideRegisterModal()
    document.getElementById('loginModal').classList.remove('hidden')
  }

  window.hideLoginModal = () => {
    document.getElementById('loginModal').classList.add('hidden')
  }

  window.submitLogin = () => {
    self.event.preventDefault()
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    handshake(() => {
      if (!email || !password) {
        document.getElementById('loginErrorMessage').innerHTML = "you forgot to enter your email/password"
        document.getElementById('loginErrorAlert').classList.remove('hidden')
        return
      }

      if (!validateEmail(email)) {
        document.getElementById('loginErrorMessage').innerHTML = "invalid email"
        document.getElementById('loginErrorAlert').classList.remove('hidden')
        return
      }

      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              window.rerender()
            })
            .catch(() => {
              document.getElementById('loginErrorMessage').innerHTML = "Incorrect email/password combination entered or account doesn't exist"
              document.getElementById('loginErrorAlert').classList.remove('hidden')
            })
        })
    })
  }

  return `
    <div id='loginModal' class="hidden fixed z-10 inset-0 overflow-y-auto">
      <div id='backgroundElement' class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div onClick='hideLoginModal()' class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form class="bg-white px-4 py-8 pb-4 rounded sm:p-6 sm:pb-4" onSubmit='submitLogin()'>
            <h1 class="mb-8 text-3xl text-center">Login</h1>
            <div id='loginErrorAlert' class="mb-3 hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span class="block sm:inline" id='loginErrorMessage'></span>
            </div>
            <input 
              type="text"
              id='loginEmail'
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email" 
            />
            <input 
              type="password"
              id='loginPassword'
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password" 
            />
            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-blue-700 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
            <div class="text-center text-sm text-grey-dark mt-4 cursor-pointer">
              <a onClick='showRegisterModal()'>Not got an account?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}

export default LoginModal