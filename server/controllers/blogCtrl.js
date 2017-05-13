// APP //
var app = require('./../index');
var db = app.get('db');

module.exports = {

	// CREATE
	createBlogEntry: function(req, res, next) {
		var blog = req.body;
		db.blogs.blog_create([blog.title, blog.author, blog.imageUrl, blog.content], function(err, blog) {
			if (err) {
				return res.status(500).send(err);
			} else {
				res.send(200);
			}
	  })
  },

	// READ

	readBlogEntries: function(req, res, next) {
		db.blogs.blog_read_all([], function(err, results){
			if (err) {
				res.send(err);
			} else {
				res.send(results);
			}
		})
	},

	readBlogEntry: function(req, res, next) {
		db.blogs.blog_read_one([req.params.id], function(err, results){
			if (err) {
				res.send(err);
				console.log(err);
			} else if (results.length === 0){
				res.status(404).send("That entry does not exist.");
				console.log("That entry does not exist.")
			}	else {
				res.send(results[0]);
				console.log(results[0]);
			}
		})
	}

};
