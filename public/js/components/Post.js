const Post = ({id, createdAt, body}) => {
  // Modifed from codegrepper post created by https://www.codegrepper.com/profile/mitchell-yuen (js add params to url)
  const goToPost = id => {
    const params = new URLSearchParams(window.location.search)

    params.set('postId', id)
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`))
    rerender()
  }

  window.goToPost = goToPost

  return `
    <div 
      class="border border-gray-200 p-6 rounded-lg mb-3 cursor-pointer" 
      onClick="goToPost('${id}')"
    >
      <!-- Modified from https://tailblocks.cc/ -->
      <div class='flex'>
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 mr-5">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            class="w-6 h-6" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2 class="mr-5 text-lg text-gray-900 font-medium title-font mb-2">Username</h2>
        <h4 class="text-m text-gray-900 font-medium title-font mb-2">${createdAt}</h4>
      </div>

      <p class="leading-relaxed text-base">${body}</p>
    </div>
  `
}

export default Post