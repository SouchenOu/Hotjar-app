import mongoose from 'mongoose';

const { Schema } = mongoose;

const surveySchema = new Schema({});

mongoose.model('surveys', surveySchema);

const ComponentSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'checkbox',
      'longTextAnswer',
      'email',
      'radio',
      'nps',
      'cta',
      'designFeedback',
      'score',
      'scoreBox',
    ],
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: function () {
      return this.type === 'checkbox' || this.type === 'radio';
    },
  },
  image: {
    type: String,
    default: '/avitoPage.png',
  },
  lowScoreTitle: {
    type: String,
    default: '',
  },
  highScoreTitle: {
    type: String,
    default: '',
  },
  surveyId: {
    type: Schema.Types.ObjectId,
    ref: 'Surveys',
  },
});
export default ComponentSchema;
