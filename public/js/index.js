import Navbar from "./components/Navbar.js"
import LoginModal from "./features/auth/LoginModal.js"
import RegisterModal from "./features/auth/RegisterModal.js"
import Feed from "./features/feed/Feed.js"
import PostView from "./features/post/PostView.js"
import {
  createLike
} from "./services/likeApi.js"

const parameters = new URLSearchParams(window.location.search)
const postId = parameters.get('postId')

const main = async () => {
  window.likePost = postId => {
    createLike({
        postId,
      })
      .then(() => {
        // Update like button on post to display that it has been liked
        const likeButtonEl = document.getElementById(`likeBtn-${postId}`)
        likeButtonEl.innerHTML = 'liked'
        likeButtonEl.classList.remove('font-semibold')
        likeButtonEl.classList.add('font-bold')
        likeButtonEl.classList.add('bg-blue-700')
        likeButtonEl.classList.add('text-white')

        // Increment like counter on post element
        const likeCounterEl = document.getElementById(`likeCounter-${postId}`)
        let count = Number(likeCounterEl.dataset.count)
        count += 1
        likeCounterEl.dataset.count = count
        likeCounterEl.innerText = `${count} like${count !== 1 ? 's' : ''}`
      })
  }

  // Modifed from codegrepper post created by https://www.codegrepper.com/profile/mitchell-yuen (js add params to url)
  window.goToPost = id => {
    const params = new URLSearchParams(window.location.search)

    params.set('postId', id)
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`))
    window.rerender()
  }

  window.goHome = () => {
    window.history.pushState({}, document.title, window.location.pathname)
    window.rerender()
  }

  const rootEl = document.getElementById('root')

  let page = ''
  if (!postId) {
    page = await Feed()
  } else {
    page = await PostView(postId)
  }

  rootEl.innerHTML = `
    ${Navbar()}
    ${RegisterModal()}
    ${LoginModal()}
    <section class='body-font'>
      ${page}
    </section>
  `
}

main()

/*
 * Like posts -/
 * Display liked posts
 * Number of users who liked a post -/
 * Unlike posts
 * Reply to posts with a button -/
 * Search users
 * See all the posts of a user -> profile
 * Get all posts the user has liked -> likes
 * Delete post
 */