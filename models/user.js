const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address'],
    trim: true,
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought',
  }, 
],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
  },
],
},
)