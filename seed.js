/*
 * This file generates (seeds) data in the database (collection of json files).
 * This is to give developers an idea of how the web app would function with many users and items.
 */
import faker from 'faker'
import admin from './lib/firebaseAdmin.js'
import Like from './models/Like.js'
import Post from './models/Post.js'

/*
 * Reset database
 * Create 15 users -> i@test.com i=1-15
 * Each user has posted between 2-10 posts -> 30-150 posts
 */
const createUsers = async (userIds) => {
  const foundUsers = await admin.auth().getUsers(userIds.map((id) => ({
    'uid': id
  })))

  let usersToCreate = foundUsers.notFound.map(userIdentifier => userIdentifier.uid)

  usersToCreate.forEach(uid => {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    admin.auth().createUser({
      uid,
      email: `${uid}@test.com`,
      password: 'password',
      photoURL: `https://eu.ui-avatars.com/api/?background=random&name=${firstName}+${lastName}`,
      displayName: `${firstName} ${lastName}`,
    })
  })
}

const createPosts = userIds => {
  let posts = []
  for (let uid = 1; uid <= 5; uid += 1) {
    // 2 <= postAmount <= 10
    let postAmount = 2 + Math.floor(Math.random() * 4)
    for (let i = 0; i < postAmount; i += 1) {
      let parentId = null
      let body = faker.random.words(Math.floor(10 * Math.random())).toLowerCase()
      let createdAt = new Date(faker.date.past())
      if (posts.length) {
        if (Math.random() > 0.5) {
          // 50% chance of the post being a reply
          parentId = posts[Math.floor(Math.random() * posts.length)].id
        }
      }
      let post = Post.create({
        userId: uid,
        parentId,
        body,
        createdAt,
      })
      posts.push(post)

      // Create likes for the post
      let likeUserPool = userIds.sort(() => 0.5 - Math.random())
      let likeAmount = 1 + Math.floor(4 * Math.random())
      for (let i = 0; i <= likeAmount; i += 1) {
        Like.create({
          postId: post.id,
          userId: likeUserPool[i],
        })
      }
      console.log(likeAmount, 'likes created for post with the id', post.id)
    }
  }
}

const main = async () => {
  // Reset database
  Like.replaceStore([])
  Post.replaceStore([])

  // Generate an array of 1-100 for the user ids
  let userIds = Array.from(Array(6).keys()).map(String)
  userIds.shift()

  await createUsers(userIds)

  createPosts(userIds)
}

main()