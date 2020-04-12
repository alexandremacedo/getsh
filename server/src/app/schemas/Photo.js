import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    photo_id: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lat_long: {
      type: String,
      required: true,
    },
    materials: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Photo', PhotoSchema);
