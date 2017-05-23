import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  preview: String,
  username: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
