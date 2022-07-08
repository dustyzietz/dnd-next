import { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
  image: {
    type: String,
    required: true
  },
});
module.exports = models.Item || model("Item", itemSchema);
