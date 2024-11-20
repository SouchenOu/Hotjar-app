import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sites: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
  },

  { timestamps: true }
);

export default mongoose.model('Users', UserSchema);
