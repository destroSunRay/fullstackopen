const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const { title, author, likes } = blogs.sort((a, b) => a.likes - b.likes)[blogs.length - 1]
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author');
  const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  };
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});
  const topAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author]);
  return {
    author: topAuthor,
    likes: authorLikes[topAuthor]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}