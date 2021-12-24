const PostInput = ({
  elementId,
  placeHolder,
  onSubmit,
} = {
  elementId: '',
  placeHolder: '',
  onSubmit: Function,
}) => {
  // Prevent any character except from letters from being entered
  const handleKeyPress = () => {
    const e = self.event
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }

    if (e.key !== ' ') {
      let re = /[a-zA-Z0-9]$/u
      if (!re.test(e.key)) {
        e.preventDefault()
      }
    }
  }

  const handleInput = () => {
    const e = self.event
    // Remove periods (auto added with double space on mac)
    e.target.value = e.target.value.replace('.', " ")
    // Remove double spaces
    e.target.value = e.target.value.replace("  ", " ")
    // Remove empty space post
    if (e.target.value === ' ') {
      e.target.value = ''
    }
  }

  window.handleKeyPress = handleKeyPress
  window.handleInput = handleInput

  return `
    <textarea id='${elementId}' oninput='handleInput()' onkeypress='handleKeyPress()' rows=2 maxlength=100 placeholder='${placeHolder}'
    class="lowercase resize-none px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"></textarea>
  `
}

export default PostInput;