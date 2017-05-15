import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  // console.log('signing in');
  return res.send({ token: tokenForUser(req.user) });
};

const createUser = (req, res, user) => {
  // console.log('creating user');
  const u = new User();
  u.email = req.body.email;
  u.password = req.body.password;
  u.username = req.body.username;
  u.save().then((user2) => {
    return res.send({ token: tokenForUser(u) });
  }).catch((error) => {
    return res.status(422).send('User created already! ');
  });
};

export const signup = (req, res, next) => {
  // console.log('signing up');
  const email = req.body.email;
  const password = req.body.password;
  // const username = req.body.username;

  if (!email || !password) {
    res.status(422).send('You must provide email, username, and password! ');
  }

  User.findOne({ email }).then((user) => {
    // console.log('finding one');
    createUser(req, res, user);
  }).catch((error) => {
    res.status(422).send('Your email is already taken! ');
  });
  // note: adapted from: http://stackoverflow.com/questions/14588032/mongoose-password-hashing
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
