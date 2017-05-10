import Post from '../models/post_model';

export const createPost = (req, res) => {
  const p = new Post();
  p.title = req.body.title;
  p.tags = req.body.tags;
  p.contents = req.body.contents;
  p.cover_url = req.body.cover_url;
  p.save().then((post) => {
    res.send(post);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

const cleanPosts = (posts) => {
  return posts.map((post) => {
    return { id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url };
  });
};

export const getPosts = (req, res) => {
  Post.find({}).then((posts) => {
    cleanPosts(posts);
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
  Post.deleteOne(req.params.id).then((post) => {
    res.send(post);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title } }, { new: true }).then((post) => {
    res.send(post);
  }).catch((error) => {
    // res.send('error');
    res.status(500).json({ error });
  });
};
