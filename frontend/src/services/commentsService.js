import axios from 'axios'
const baseUrl = '/api/comments'

const getAllComments = async () => {
    let response = null
    try {
        response = await axios.get(baseUrl)
    } catch (e){
        console.error(`error while calling get all comments ${e.message}`)
    }
    return response.data
}

const createComment = async (commentObject,token) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl,commentObject,config)
    return response.data
}


const deleteComment = async (id, token) => {
    console.log(`entering deleteComment with id: ${id} and token: ${token}`)
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`,config)
    return response.data
}
export default { getAllComments, createComment, deleteComment }

