import admin from "../lib/firebaseAdmin.js"
import Like from "../models/Like.js"
import Post from "../models/Post.js"

const get_users = (req, res) => {
  const query = req.query.query

  admin.auth().listUsers()
    .then(data => data.users)
    .then(users => {
      let search = new RegExp(query, 'iu')
      res.status(200).send(users.filter(user => search.test(user.displayName) || search.test(user.email)))
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