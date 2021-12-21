const getArticles = async () => {
  const articles = await fetch('/api/articles', {
    method: 'GET',
  }).then(res => res.json())

  console.log(articles)
}

getArticles()