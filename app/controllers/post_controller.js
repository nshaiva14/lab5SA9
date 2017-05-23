import Post from '../models/post_model';

export const createPost = (req, res) => {
  const p = new Post();
  p.title = req.body.title;
  p.tags = req.body.tags;
  p.content = req.body.content;
  p.preview = req.body.preview;
  p.username = req.user.username;
  console.log(p.username);
  p.save().then((post) => {
    res.send(post);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find({}).then((posts) => {
    res.send(posts);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.send(post);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id).then((post) => {
    console.log(req.params.id);
    res.send(post);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, tags: req.body.tags, content: req.body.content, preview: req.body.preview } }, { new: true }).then((post) => {
    res.send(post);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
