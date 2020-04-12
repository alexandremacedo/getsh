import mongoose from 'mongoose';

const UserPhotoSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    user_photos: {
      type: Array,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('UserPhoto', UserPhotoSchema);
