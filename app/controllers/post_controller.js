import Post from '../models/post_model';

export const createPost = (req, res) => {
  const p = new Post();
  p.title = req.body.title;
  p.save().then((post) => {
    res.send(post);
  }).catch((error) => {
    res.send('error');
  });
};

export const getPosts = (req, res) => {
  Post.find({}).then((posts) => {
    res.send(posts);
  }).catch((error) => {
    res.send('error');
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.send(post);
  }).catch((error) => {
    res.send('error');
  });
};

export const deletePost = (req, res) => {
  Post.deleteOne(req.params.id).then((post) => {
    res.send(post);
  }).catch((error) => {
    res.send('error');
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title } }, { new: true }).then((post) => {
    res.send(post);
  }).catch((error) => {
    res.send('error');
  });
};
