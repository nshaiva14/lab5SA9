import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';
import signS3 from './services/s3';

const router = Router();

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.get('/sign-s3', signS3);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);


router.route('/posts/:id')
    .get(Posts.getPost)
    .put(requireAuth, Posts.updatePost)
    .delete(requireAuth, Posts.deletePost);


export default router;
