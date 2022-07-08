import { Schema, model, models } from "mongoose";

const mapSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  campaignId: {
    type: String,
  },
});
module.exports = models.Map || model("Map", mapSchema);
