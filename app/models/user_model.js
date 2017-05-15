import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
}, {
  toJSON: {
    virtuals: true,
  },
});


UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) next(err);

      // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) next(err);

          // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, comparisonResult) => {
    if (err) return callback(err);
    return callback(null, comparisonResult);
  });
};
// note: CODE IS adapted from: http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;


// UserSchema.set('toJSON', {
//   virtuals: true,
// });;
