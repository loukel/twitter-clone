/*
 * This file generates (seeds) data in the database (collection of json files).
 * This is to give developers an idea of how the web app would function with many users and items.
 */
import faker from 'faker'
import admin from './lib/firebaseAdmin.js'
import Post from './models/Post.js'

let post1 = Post.create({
  body: 'cool post'
})

Post.create({
  parentId: post1.id,
  body: 'cool post 2'
})

/*
 * Create 100 users -> i@test.com i=1-100
 * Each user has posted between 2-10 posts -> 600 posts
 */

let userIds = Array.from(Array(101).keys()).map(String)
userIds.shift()

const createUsersAndPosts = async () => {
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

createUsersAndPosts()