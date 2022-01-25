import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import handshake from "../../utils/handshake.js"
import validateEmail from '../../utils/validateEmail.js'

/*
 * Modal modifed from https://tailwindui.com/components/application-ui/overlays/modals
 */

const RegisterModal = () => {
  const auth = getAuth()

  window.showRegisterModal = () => {
    window.hideLoginModal()
    document.getElementById('registerModal').classList.remove('hidden')
  }

  window.hideRegisterModal = () => {
    document.getElementById('registerModal').classList.add('hidden')
  }

  window.submitRegister = () => {
    self.event.preventDefault()
    const fullName = document.getElementById('registerFullName').value
    const email = document.getElementById('registerEmail').value
    const password = document.getElementById('registerPassword').value
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value

    handshake(() => {
      if (!fullName || !email || !password) {
        document.getElementById('registerErrorMessage').innerHTML = "you forgot to enter your name/email/password"
        document.getElementById('registerErrorAlert').classList.remove('hidden')
        return
      }

      if (!validateEmail(email)) {
        document.getElementById('registerErrorMessage').innerHTML = "invalid email"
        document.getElementById('registerErrorAlert').classList.remove('hidden')
        return
      }

      if (password === passwordConfirm) {
        document.getElementById('registerErrorMessage').innerHTML = "you confirmed your password incorrectly"
        document.getElementById('registerErrorAlert').classList.remove('hidden')
        return
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user
          updateProfile(user, {
            displayName: fullName,
            photoURL: `https://eu.ui-avatars.com/api/?background=random&name=${fullName.split(' ').join('+')}`
          }).then(() => {
            window.rerender()
          })
        })
    })
  }

  return `
    <div id='registerModal' class="hidden fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div onClick='hideRegisterModal()' class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit='submitRegister()' class="bg-white px-4 py-8 pb-4 rounded sm:p-6 sm:pb-4">
            <h1 class="mb-8 text-3xl text-center">Register</h1>
            <div id='registerErrorAlert' class="mb-3 hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span class="block sm:inline" id='registerErrorMessage'></span>
            </div>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              id='registerFullName'
              placeholder="Full Name" 
            />
            <input 
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              id='registerEmail'
              placeholder="Email" 
            />
            <input 
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              id="registerPassword"
              placeholder="Password" 
            />
            <input 
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              id='registerPasswordConfirm'
              placeholder="Confirm Password" 
            />

            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-blue-700 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Register
            </button>

            <div class="text-center text-sm text-grey-dark mt-4 cursor-pointer">
              <a onClick='showLoginModal()'>Already got an account?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}

export default RegisterModal