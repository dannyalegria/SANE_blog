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
			} else if (results.length === 0){
				res.status(404).send("That entry does not exist.");
			}	else {
				res.send(results[0]);
			}
		})
	},

	// UPDATE

	// updateBlogEntry: function(req, res, next) {
	// 	db.blogs.blog_update([req.body.title, req.body.author, req.body.imageurl, req.body.content], function(err) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send(err);
  //     }
  //     return res.status(200).send("You did it!");
  //   });
	// }

	updateBlogEntry: function(req, res, next){
		db.blogs.blog_update([
			req.params.id,
			req.body.title,
			req.body.author,
			req.body.imageurl,
			req.body.content
		],
		function(err, results){
			if (err){
				console.error(err);
				res.send(err);
			} else {
				res.send(results[0]);
			}
		})
	},

	// DELETE

	deleteBlogEntry: function(req, res, next){
		db.blogs.blog_delete([req.params.id], function(err, results){
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(results);
			}
		})
	}

};
