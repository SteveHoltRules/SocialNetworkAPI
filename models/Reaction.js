const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: (createAtVal) => dateFormat(createAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// const Reaction = model("Reaction", ReactionSchema);

module.exports = ReactionSchema;