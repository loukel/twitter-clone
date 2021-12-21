import { getPosts } from "./services/postApi.js"
import { isUpper } from "./utils.js"

const main = () => {
  const newPostEl = document.getElementById('newPost')
  const postSumbitEl = document.getElementById('postSubmit')
  
  getPosts()
  
  // Prevent any character except from letters from being entered
  newPostEl.addEventListener('keypress', (e) => {
    if (e.key !== ' ') {
      let re = /[a-zA-Z]$/
      if (!re.test(e.key)) {
        e.preventDefault()
      }
    }
  })
  
  newPostEl.addEventListener('input', (e) => {
    // Remove periods (auto added with double space on mac)
    e.target.value = e.target.value.replace('.', " ")
    // Remove double spaces
    e.target.value = e.target.value.replace("  ", " ")
    // Remove empty space post
    if (e.target.value === ' ') {
      e.target.value = ''
    }
  })
}

main()