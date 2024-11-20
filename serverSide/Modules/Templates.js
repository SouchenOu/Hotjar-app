import mongoose from 'mongoose';

const { Schema } = mongoose;

const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model('Templates', TemplateSchema);
