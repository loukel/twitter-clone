import Posts from "../../../../components/Posts.js"
import {
  getUser
} from "../../../../services/userApi.js"

const Profile = async (userId) => {
  let user = await getUser(userId)

  return `
  <div class="container px-5 py-12 mx-auto animate-fade">
    <h1 class='text-4xl font-medium mb-4'>
      ${user.displayName}'s Posts
    </h1>
    <div id='posts'>
      ${Posts(user.posts)}
    </div>
  </div>
  `
}

export default Profile