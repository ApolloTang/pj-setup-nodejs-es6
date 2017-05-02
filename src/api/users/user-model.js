import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// export default mongoose.model('user', UserSchema);


// Wrap model creation in try-catch to prevent error in testing resatart
// ref:
// https://groups.google.com/forum/?fromgroups=#!topic/mongoose-orm/PXTjqqpaDFk
try {
  var model = mongoose.model('user');
} catch (err) {
  var model = mongoose.model('user', UserSchema);
}

export default model
