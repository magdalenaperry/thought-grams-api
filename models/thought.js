const {
  Schema,
  model, 
  Types
} = require('mongoose');

const User = require('./user')

const reactionSchema = new Schema(
  {
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
    // format
  }
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
    // get method
  },
  username: [{
    type: String,
    ref: 'user',
  }, ],
  reactions: [reactionSchema],
}, {
  // allow virtuals to be used
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// TODO: create a virtual that retrieves the length of a thoughts reactions field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;