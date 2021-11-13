const { Schema, model, Types} = require('mongoose');


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
      get: (createAtVal) => dateFormat(createdAtVal),
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