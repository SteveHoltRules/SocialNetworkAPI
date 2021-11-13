const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reaction: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function(){
  return this.reaction.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;