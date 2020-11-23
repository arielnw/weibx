const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


const app = express();

// connect DB
const dbURI = 'mongodb+srv://dev:test123@weibx.yqtoc.mongodb.net/blogs-weibx?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('connected to db')
		// app.listen(3000, () => {
		// 	console.log('app listen on http://localhost:3000')
		// });
	})
	.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');


app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
	res.redirect('/blogs')
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' })
});

app.use('/blogs', blogRoutes)

app.use((req, res) => {
	res.status(404).render('404',  { title: 'Not Found' })
})

module.exports = app