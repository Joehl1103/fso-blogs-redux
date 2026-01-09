import axios from 'axios'

const getAllComments = async () => {
  let response = null
  try {
    response = await axios.get(`${import.meta.env.VITE_API_BASE_URL ?? ''}/api/comments`)
  } catch (e) {
    console.error('Failed to fetch comments:', e)
  }
  return response.data
}

const createComment = async (commentObject, token) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL ?? ''}/api/comments`, commentObject, config)
  return response.data
}


const deleteComment = async (id, token) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL ?? ''}/api/comments/${id}`, config)
  return response.data
}
export default { getAllComments, createComment, deleteComment }

