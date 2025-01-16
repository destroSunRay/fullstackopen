const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  author: {
    type: String,
    minLength: 3,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  comments: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)