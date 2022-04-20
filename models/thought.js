const {
  Schema,
  model,
  Types
} = require('mongoose');

const timeFormat = require('../utils/timeformat');

const User = require('./user')

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // not good practice, keep ISO string so that you can manipulate it
    get: timestamp => timeFormat(timestamp)
  },
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});


const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // not good practice, keep ISO string so that you can manipulate it
    get: timestamp => timeFormat(timestamp)
  },
  username: [{
    type: String,
    ref: 'user',
  }, ],
  reactions: [reactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;