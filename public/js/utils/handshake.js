const handshake = (f) => {
  fetch('/')
    .then(() => {
      f()
    })
    .catch(error => {
      console.error(error)
      console.error('Server has disconnected!')
      alert('Server has disconnected!')
    })
}

export default handshake