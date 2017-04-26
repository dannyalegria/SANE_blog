// APP //
var app = require('./../index');
var db = app.get('db');

module.exports = {

	// Create Blog Entry //
	createBlogEntry: function(req, res, next) {
		var blog = req.body;

		db.blogs.blog_create([blog.title, blog.author, blog.imageUrl, blog.content], function(err, blog) {
			// If err, send err
			if (err) {
				console.log('Create Blog error: ', err);
				return res.status(500).send(err);
			}
	  })
  }
};
