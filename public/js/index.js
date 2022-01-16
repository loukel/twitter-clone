import Navbar from "./components/Navbar.js"
import LoginModal from "./features/auth/LoginModal.js"
import RegisterModal from "./features/auth/RegisterModal.js"
import Feed from "./features/feed/Feed.js"
import PostView from "./features/post/PostView.js"
import UserList from "./features/users/features/userList/UserList.js"
import {
  createLike,
  destroyLike
} from "./services/likeApi.js"
import Profile from "./features/users/features/userIndividual/Profile.js"

const parameters = new URLSearchParams(window.location.search)
const postId = parameters.get('postId')
const search = parameters.get('search')
const userId = parameters.get('userId')

const main = async () => {
  window.likePost = postId => {
    createLike({
        postId,
      })
      .then(like => {
        // Update like button on post to display that it has been liked
        const likeButtonEl = document.getElementById(`likeBtn-${postId}`)
        likeButtonEl.innerHTML = 'liked'
        likeButtonEl.classList.remove('font-semibold')
        likeButtonEl.classList.add('font-bold')
        likeButtonEl.classList.add('bg-blue-700')
        likeButtonEl.classList.add('text-white')
        likeButtonEl.setAttribute('onclick', `removeLike('${like.id}')`)

        // Increment like counter on post element
        const likeCounterEl = document.getElementById(`likeCounter-${postId}`)
        let count = Number(likeCounterEl.dataset.count)
        count += 1
        likeCounterEl.dataset.count = count
        likeCounterEl.innerText = `${count} like${count !== 1 ? 's' : ''}`
      })
  }

  window.removeLike = (likeId) => {
    destroyLike(likeId)
      .then(like => {
        // Update like button on post to display that it has been liked
        const likeButtonEl = document.getElementById(`likeBtn-${like.postId}`)
        likeButtonEl.innerHTML = 'like'
        likeButtonEl.classList.add('font-semibold')
        likeButtonEl.classList.remove('font-bold')
        likeButtonEl.classList.remove('bg-blue-700')
        likeButtonEl.classList.remove('text-white')
        likeButtonEl.setAttribute('onclick', `likePost('${like.postId}')`)

        // Increment like counter on post element
        const likeCounterEl = document.getElementById(`likeCounter-${like.postId}`)
        let count = Number(likeCounterEl.dataset.count)
        count -= 1
        likeCounterEl.dataset.count = count
        likeCounterEl.innerText = `${count} like${count !== 1 ? 's' : ''}`
      })
  }

  // Modifed from codegrepper post created by https://www.codegrepper.com/profile/mitchell-yuen (js add params to url)
  window.goToPost = id => {
    fetch('/')
      .then(() => {
        window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?postId=${id}`))
        window.rerender()
      })
      .catch(error => {
        console.error(error)
        console.error('Server has disconnected!')
        alert('Server has disconnected!')
      })
  }

  window.goHome = () => {
    fetch('/')
      .then(() => {
        window.history.pushState({}, document.title, window.location.pathname)
        window.rerender()
      })
      .catch(error => {
        console.error(error)
        console.error('Server has disconnected!')
        alert('Server has disconnected!')
      })
  }

  const rootEl = document.getElementById('root')

  rootEl.innerHTML = `
    ${Navbar()}
    ${RegisterModal()}
    ${LoginModal()}
    <section id='main' class='body-font'>
      <!-- Loading copied from https://larainfo.com/blogs/tailwind-css-loading-spinner-example -->
      <div class="flex items-center justify-center h-80">
        <div class="w-40 h-40 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
      </div>
    </section>
  `

  let page = ''
  if (postId) {
    page = await PostView(postId)
  } else if (search) {
    page = await UserList(search)
  } else if (userId) {
    page = await Profile(userId)
  } else {
    page = await Feed()
  }

  document.getElementById('main').innerHTML = page
}

main()

/*
 * Search users /users
 * User profile -> see all the posts of a user /user/:id
 * Get all posts the user has liked -> likes
 */