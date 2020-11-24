const Blog = require('../models/course')

const course_index = (req, res) => {
  Blog.find().sort({
      createdAt: -1
    })
    .then((result) => {
      res.render('blogs/index', {
        title: 'All Blogs',
        blogs: result
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const course_details = (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', {
        blog: result,
        title: result.title
      })
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not Found' })
    })
}

const course_create_get = (req, res) => {
  res.render('blogs/create', {
    title: 'Create Blog'
  });
}

const course_create_post = (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => {
      console.log(err)
    })
}

const course_delete = (req, res) => {
  const id = req.params.id

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({
        redirect: '/blogs'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  course_index,
  course_details,
  course_create_get,
  course_create_post,
  course_delete
}
