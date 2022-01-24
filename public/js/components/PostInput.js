const PostInput = ({
  elementId,
  placeHolder,
} = {
  elementId: '',
  placeHolder: '',
}) => `
    <textarea name='input' type="submit" id='${elementId}' rows=2 maxlength=100 placeholder='${placeHolder}'
    class="resize-none px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"></textarea>
  `

export default PostInput;