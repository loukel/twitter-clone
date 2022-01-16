import {
  getAuth,
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import {
  formatDateTime
} from "../utils/dateTime.js"

const Post = ({
  id,
  createdAt,
  body,
  user,
  likes,
}, {
  replyButton
} = {
  replyButton: true
}) => {
  const auth = getAuth()
  const currentUser = auth.currentUser

  let likeCount = likes.length

  let liked = false
  let like = null
  if (currentUser && likeCount !== 0) {
    [like] = likes.filter((like) => like.userId === currentUser.uid)
    if (like) {
      liked = true
    }
  }

  return `
    <div 
      class="border border-gray-200 bg-white p-6 rounded-lg mb-3 cursor-pointer"
      ${currentUser ? '' : `onClick="goToPost('${id}')"`}
    >
      <!-- Modified from https://tailblocks.cc/ -->
      <div class='flex relative'>
        <div class="w-10 h-10 inline-flex items-center justify-center rounded-full border mb-4 mr-5">
          <img class="rounded-full" src="${user.photoURL}" alt="user photo">
        </div>
        <h2 class="mr-5 text-lg text-gray-900 font-medium title-font mb-2">${user.displayName} <small>${user.email}</small></h2>
        <h4 class="text-m text-gray-900 font-medium title-font mb-2">${formatDateTime(new Date(createdAt))}</h4>
        <h4 class="text-semibold absolute top-0 right-0" id='likeCounter-${id}' data-count='${likeCount}'>${likeCount} like${likeCount !== 1 ? 's' : ''}</h4>
      </div>

      <p class="leading-relaxed text-base">${body}</p>
      ${currentUser 
        ? `
          <div class='grid grid-cols-${replyButton ? 2 : 1}'>
            <button 
              onClick="${liked ? `removeLike('${like.id}')` : `likePost('${id}')`}" 
              id='likeBtn-${id}' 
              class='py-2 px-4 border ${liked 
                ? 'font-bold bg-blue-700 text-white'
                : 'font-semibold'
              }'
            >
              like${liked ? 'd' : ''}
            </button>
            ${replyButton 
              ? `
                <button class='font-semibold py-2 px-4 border' onClick="goToPost('${id}')">reply</button>
              `
              : ''
            } 
          </div>
        `
        : ''
      }
    </div>
  `
}

export default Post