import {
  formatDateTime
} from "../utils/dateTime.js"

const Post = ({
  id,
  createdAt,
  body,
  user,
}) => {
  // Modifed from codegrepper post created by https://www.codegrepper.com/profile/mitchell-yuen (js add params to url)
  const goToPost = id => {
    const params = new URLSearchParams(window.location.search)
    // There is no need to rerender if the same post is pressed again
    if (params.get('postId') === id) {
      return
    }

    params.set('postId', id)
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`))
    window.rerender()
  }

  window.goToPost = goToPost

  return `
    <div 
      class="border border-gray-200 bg-white p-6 rounded-lg mb-3 cursor-pointer" 
      onClick="goToPost('${id}')"
    >
      <!-- Modified from https://tailblocks.cc/ -->
      <div class='flex'>
        <div class="w-10 h-10 inline-flex items-center justify-center rounded-full border mb-4 mr-5">
          <img class="rounded-full" src="https://eu.ui-avatars.com/api/?background=random&name=L+K" alt="user photo">
        </div>
        <h2 class="mr-5 text-lg text-gray-900 font-medium title-font mb-2">${user.displayName} <small>${user.email}</small></h2>
        <h4 class="text-m text-gray-900 font-medium title-font mb-2">${formatDateTime(new Date(createdAt))}</h4>
      </div>

      <p class="leading-relaxed text-base">${body}</p>
    </div>
  `
}

export default Post