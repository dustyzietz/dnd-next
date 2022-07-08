import { Schema, model, models } from "mongoose";

const campaignSchema = new Schema({
  realmMaster: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  items: [],
  players: [
    {
      playerId: {
        type: [Schema.Types.ObjectId],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
      currentHp: {
        type: Number,
        required: false,
      },
      modifiers: Object,
      isMonster: Boolean,
      size: {
        type: Number,
      }
    },
  ],
  map: {
    name: String,
    image: String,
    mapId:  [Schema.Types.ObjectId],
  },
});
module.exports = models.Campaign || model("Campaign", campaignSchema);
