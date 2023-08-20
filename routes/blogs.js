const express = require("express");
const multer = require("multer");

const Blog = require("../models/Blogs");

//set multer storage
const multerStorage = multer.diskStorage({
  //file destination
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  //add back the extension
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({ storage: multerStorage });

const router = express.Router();

//home route
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: "desc" })
    .then((blogs) => {
      res.render("index", { blogs: blogs, title: "All Posts" });
    })
    .catch((err) => console.log(err));
});

// New post route
router.get("/new", (req, res) => {
  res.render("new", { title: "New Post" });
});

router.post("/", upload.single("image"), (req, res) => {
  const blogObjects = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };
  if (req.file) {
    blogObjects.image = req.file.filename;
  }
  const newBlog = new Blog(blogObjects);
  newBlog
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// single post route
router.get("/show/:id", (req, res) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      res.render("show", { blog, title: "Single Post" });
    })
    .catch((err) => console.log(err));
});
// edit and update route
router.get("/edit/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("edit", { title: "Edit page", blog: result });
    })
    .catch((err) => console.log(err));
});
router.post("/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const blogUpdate = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };
  if (req.file) {
    blogUpdate.image = req.file.filename;
  }
  Blog.findByIdAndUpdate(id, blogUpdate)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// delete route
router.get("/delete/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});
module.exports = router;
