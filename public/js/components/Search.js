import handshake from "../utils/handshake.js"

const Search = () => {
  window.searchUser = () => {
    const e = self.event
    e.preventDefault()
    const userQuery = document.getElementById('userSearchInput').value
    if (userQuery) {
      handshake(() => {
        window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?search=${userQuery}`))
        window.rerender()
      })
    }
  }

  return `
  <div class="flex justify-center mt-4">
    <!-- search box modified from https://tailwind-elements.com/docs/standard/forms/search/ -->
    <div class="xl:w-96">
      <form class="input-group relative flex items-stretch w-full" onSubmit='searchUser()'>
        <input id='userSearchInput' type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search users" aria-label="Search" aria-describedby="button-addon3">
        <button type='submit' class="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Search</button>
      </form>
    </div>
  </div>
  `
}

export default Search;