//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://admin-Samar:samararman123@cluster0-shard-00-00.opdf9.mongodb.net:27017,cluster0-shard-00-01.opdf9.mongodb.net:27017,cluster0-shard-00-02.opdf9.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3ey860-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true});
const postSchema = {
  title: String,
  author:String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  res.render("home");
});

app.get("/blog",function(req,res){

  Post.find({}, function(err, posts){
    res.render("blog", {
      posts: posts
      });
  });
});
 
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    author: req.body.postAuthor,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/blog");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      author:post.author,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about");
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3009;
}
app.listen(port, function() {
  console.log("Server started on port 3009");
});

