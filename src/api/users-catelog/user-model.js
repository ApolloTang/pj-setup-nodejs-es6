import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('user', UserSchema);
