import mongoose from 'mongoose';

const { Schema } = mongoose;
const surveySchema = new Schema({});

mongoose.model('Survey', surveySchema);

const SiteSchema = new mongoose.Schema({
  organisation: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  trackingCode: {
    type: String,
    required: false,
  },
  surveys: [{ type: Schema.Types.ObjectId, ref: 'Survey' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      role: {
        type: String,
        enum: ['read', 'read_write'],
        required: true,
      },
    },
  ],
});

export default mongoose.model('Site', SiteSchema);
