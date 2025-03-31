import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    content: { type: String, required: true, maxlength: 255 },
    media_link: { type: String, maxlength: 100 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

PostSchema.plugin(AutoIncrement, { inc_field: "post_id" });

const Post = mongoose.model("Post", PostSchema);

export default Post;
