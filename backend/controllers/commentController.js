const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

commentsRouter.get('/', async (request, response) => {
    console.log('entering get for comments')
    const comments = await Comment.find({})
        .populate('user', {_id: 1, username: 1})
        .populate('blog', {_id: 1})
    response.status(200).json(comments)
})

commentsRouter.post('/', middleware.userExtractor, async (request, response) => {
    console.log('entering post for comments')
    let { content, date, blogId } = request.body
    const user = request.user
    const comment = new Comment({
        content: content,
        date: date,
        blog: blogId ,
        user: user._id
    })

    const savedComment = comment.save()
    response.status(201).json(savedComment)
})

commentsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    console.log('id in delete',id)
    try {
        await Comment.deleteOne({ _id: id})
    } catch (e){
        console.error(`error while deleting blog with mongoose: ${e.message}`)
    }
    response.status(204).json(`blog with id ${id} deleted`)
})

module.exports = commentsRouter