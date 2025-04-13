const mongoose = require("mongoose");

// created: {
//   type: Date,
//   required: true,
// }

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      minlength: 3,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: 3,
    },
  },
  { timestamps: true }
);

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Post", postSchema);
