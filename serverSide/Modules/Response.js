import mongoose from 'mongoose';

const { Schema } = mongoose;

const ResponseSchema = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      Ref: 'Surveys',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      Ref: 'Users',
      default: null,
    },

    sessionId: {
      type: String,
      required: true,
    },
    responses: [
      {
        componentId: {
          type: Schema.Types.ObjectId,
          ref: 'Components',
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        responseValue: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Response', ResponseSchema);
