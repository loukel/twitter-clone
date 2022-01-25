import Posts from "../../../../components/Posts.js"
import {
  getUser
} from "../../../../services/userApi.js"

const Profile = async (userId) => {
  let user = await getUser(userId)

  window.onscroll = () => false

  return `
  <div class="container px-5 py-12 mx-auto animate-fade">
    <div class='text-4xl font-medium'>
      ${user.displayName}'s Posts
    </div>
    <div class='text-3xl font-medium'>
      Posts → ${user.posts.length} 
    </div>
    <div id='posts' class='mt-4'>
      ${Posts(user.posts)}
    </div>
  </div>
  `
}

export default Profile