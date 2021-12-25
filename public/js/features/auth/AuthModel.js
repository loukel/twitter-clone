import Login from "./Login.js"
import Register from "./Register.js"

/*
 * Modal modifed from https://tailwindui.com/components/application-ui/overlays/modals
 * Tabs modified from https://tailwind-elements.com/docs/standard/navigation/tabs/
 */

const AuthModal = () => {
  window.showAuthModal = () => {
    document.getElementById('authModal').classList.remove('hidden')
  }

  window.hideAuthModal = () => {
    document.getElementById('authModal').classList.add('hidden')
  }

  window.showRegisterTab = () => {
    document.getElementById('registerTab').classList.remove('hidden')
    document.getElementById('loginTab').classList.add('hidden')
  }

  window.showLoginTab = () => {
    document.getElementById('loginTab').classList.remove('hidden')
    document.getElementById('registerTab').classList.add('hidden')
  }

  return `
    <div id='authModal' class="hidden fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div onClick='hideAuthModal()' class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tabFill"
          role="tablist">
            <li class="nav-item flex-auto text-center cursor-pointer">
              <a 
                class="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                onClick='showRegisterTab()'
              >
                register
              </a>
            </li>
            <li class="nav-item flex-auto text-center cursor-pointer">
              <a 
                class="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent'
                onClick='showLoginTab()'
              >
                login
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade" id="registerTab">
              ${Register()}
            </div>
            <div class="tab-pane fade hidden" id="loginTab">
              ${Login()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

export default AuthModal