let fs = require('fs')
const { Article } = require('./utils/articleFunctions')

let articles = [
  Article({
    authorUID: '123456789',
    title: 'Cool Article 1',
    description: 'About cool stuff',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, tempora possimus. Reiciendis architecto, quaerat unde non numquam, vitae dignissimos voluptatum saepe tempora quibusdam, sit corrupti tempore voluptatem atque quod libero!',
    category: 'Computer Science',
  }),
  Article({
    authorUID: '123456789',
    title: 'Cool Article 2',
    description: 'About more cool stuff',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto alias natus eveniet explicabo? Eligendi optio dolor aliquam. Dignissimos, tempore sequi. Quaerat tempore voluptatem nam excepturi quos laboriosam, fugit ratione sit libero optio pariatur necessitatibus repudiandae amet error quis quo eum accusamus incidunt quam rem maxime cumque! Accusamus ratione explicabo ab, nisi dolorem saepe excepturi nobis totam, labore, quis quidem placeat temporibus voluptatum mollitia non sequi tenetur eius? Sint molestias reprehenderit officiis perferendis facilis pariatur doloremque alias vitae maxime maiores, quia magni hic impedit eum quidem, eligendi, reiciendis quam id voluptate at! Nesciunt cum ipsum maiores eligendi voluptatum quos expedita eos!',
  }),
]

const store = JSON.stringify(articles)
fs.writeFileSync("./store.json", store, err => {
  if (err) throw err
})