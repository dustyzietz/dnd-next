import { Schema, model, models } from "mongoose";

const playerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  owner: String, 
});
module.exports = models.Player || model("Player", playerSchema);
