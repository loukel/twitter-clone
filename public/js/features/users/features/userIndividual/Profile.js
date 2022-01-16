import Posts from "../../../../components/Posts.js"

const Profile = (userId) => {
  let posts = []
  return `
  <div class="container px-5 py-12 mx-auto animate-fade">
    <div>
      Louis Kelly
    <div>
    <div id='posts'>
      ${Posts(posts)}
    </div>
  </div>
  `
}

export default Profile