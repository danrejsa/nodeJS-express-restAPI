const Users = require("./src/Users");
const posts = require("./src/posts");
const photos = require("./src/photos");
const validateUsers = require("./validations/validateUsers");
const validatePosts = require("./validations/validatePosts");
const validatePhotos = require("./validations/validatePhotos");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.json());



//GET Request Handler

app.get("/api/users", (req, res) => {
  res.send(Users);
});
app.get("/api/posts", (req, res) => {
  res.send(posts);
});
app.get("/api/photos", (req, res) => {
  res.send(photos);
});

app.get("/api/users/:id", (req, res) => {
  //check if user exist
  const user = Users.find(c => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The request with the given id was not found!");
  //return user
  res.send(user);
});
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find(c => c.id === parseInt(req.params.id));
  if (!post)
    return res.status(400).send("The request with the given id was not found");
  res.send(post);
});

app.get("/api/photos/:id", (req, res) => {
  const photo = photos.find(c => c.id === parseInt(req.params.id));
  if (!photo)
    return res.status(404).send("The request with the given id was not found!");
  res.send(photo);
});




//POST Request Handler
app.post("/api/users", (req, res) => {
  //validate post
  const { error } = validateUsers(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //post
  const user = {
    id: Users.length + 1,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    address: {
      city: req.body.address.city,
      Street: req.body.address.Street,
      lat: req.body.address.lat
    }
  };
  Users.push(user);
  res.send(user);
});

app.post("/api/posts", (req, res) => {
  const { error } = validatePosts(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const post = {
    id: posts.length + 1,
    title: req.body.title,
    message: req.body.message
  };
  posts.push(post);
  res.send(post);
});

app.post("/api/photos", (req, res) => {
  const { error } = validatePhotos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const photo = {
    id: photos.length + 1,
    title: req.body.title,
    img_url: req.body.img_url,
    publisher: req.body.publisher
  };
  photos.push(photo);
  res.send(photo);
});


//DELETE Request Handler

app.delete("/api/users/:id", (req, res) => {
  //check if user exist
  const user = Users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("user with the given id not Found!");
  //delete user
  const index = Users.indexOf(user);
  Users.splice(index, 1);
  res.send(user);
});

app.delete("/api/posts/:id", (req, res) => {
  const post = posts.find(c => c.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("post with the given id not Found!");
  const index = posts.indexOf(post);
  posts.splice(index, 1);
  res.send(post);
});

app.delete("/api/photos/:id", (req, res) => {
  const photo = photos.find(c => c.id === parseInt(req.params.id));
  if (!photo)
    return res.status(404).send("The request with the given id not found!");

  const index = photos.indexOf(photo);
  photos.splice(index, 1);
  res.send(photos);
});



// PUT Request Handler

app.put("/api/users/:id", (req, res) => {
  //check if user exist
  const user = Users.find(c => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("Request with the given id not found!");
  //validate update
  const { error } = validateUsers(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  //update user
  user.name = req.body.name;
  user.age = req.body.age;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.address.city = req.body.address.city;
  user.address.Street = req.body.address.Street;
  user.address.lat = req.body.address.lat;
  res.send(user);
});

app.put("/api/posts/:id", (req, res) => {
  const post = posts.find(c => c.id === parseInt(req.params.id));
  if (!post)
    return res.status(404).send("Request with the given id not Found!");

  const { error } = validatePosts(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  post.title = req.body.title;
  post.message = req.body.message;
  res.send(post);
});

app.put('/api/photos/:id', (req,res) => {
  const photo = photos.find(c => c.id === parseInt(req.params.id));
  if(!photo) return res.status(404).send('Request with the given id not found');

  const {error} = validatePhotos(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  photo.title = req.body.title;
  photo.message = req.body.message;
  res.send(photos);
})
