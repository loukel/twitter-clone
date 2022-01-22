import admin from "../lib/firebaseAdmin.js"
import Like from "../models/Like.js"
import Post from "../models/Post.js"

const get_users = (req, res) => {
  admin.auth().listUsers()
    .then(users => {
      res.status(200).send(users)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
}

const get_user = async (req, res) => {
  const id = req.params.id
  try {
    let user = await admin.auth().getUser(`${id}`)
    const posts = await Post.findMany({
      userId: user.uid,
      include: {
        likes: true,
        user: true,
      }
    })

    const likes = await Like.findMany({
      userId: user.uid,
      include: {
        post: {
          include: {
            user: true,
          }
        },
      }
    })

    user = {
      ...user,
      posts,
      likes,
    }

    /*
     * Add user's liked posts
     * user.likes = await Like.findMany({
     *   userId: user.uid,
     *   include: {
     *     post: true,
     *     user: true,
     *   }
     * })
     */

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export default {
  get_users,
  get_user,
}