const Loader = () => `
  <!-- Loading copied from https://larainfo.com/blogs/tailwind-css-loading-spinner-example -->
  <div class='hidden fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity' id='loader'>
    <div class="flex justify-center items-center h-screen">
      <div class="w-40 h-40 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
    </div>
  </div>
`

export default Loader