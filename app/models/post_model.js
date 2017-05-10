import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field


// create PostModel class from schema

const PostSchema = new Schema({
  title: String,
  // imageURL: String,
  // upvotes: { type: Number, default: 0 },
  // downvotes: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true,
  },
});
//
// PostSchema.virtual('score').get(function scoreCalc() {
//   return this.upvotes - this.downvotes;
// });

// create model class
const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
