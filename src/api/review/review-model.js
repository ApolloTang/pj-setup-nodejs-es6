import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var RevieweeSchema = new Schema({
  reviewee: {
    // type: Schema.Types.ObjectId,
    // required: true
    type: String,
    // ref: 'user',
  },
  reviewer: {
    // type: Schema.Types.ObjectId,
    // required: true
    type: String,
    // ref: 'user',
  },
  content: {
    type: String,
    required: true,
    default: ''
  }
});



// Wrap model creation in try-catch to prevent error in testing resatart
// ref:
// https://groups.google.com/forum/?fromgroups=#!topic/mongoose-orm/PXTjqqpaDFk
try {
  var model = mongoose.model('review');
} catch (err) {
  var model = mongoose.model('review', RevieweeSchema);
}

export default model
