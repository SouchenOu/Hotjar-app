import mongoose from 'mongoose';
import ComponentSchema from './Component.js';

const { Schema } = mongoose;

const userSchema = new Schema({});

const siteSchema = new Schema({});

mongoose.model('site', siteSchema);
mongoose.model('User', userSchema);

const SurveysSchema = new Schema(
  {
    createdUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    components: {
      type: [ComponentSchema],
      required: true,
    },
    target: {
      type: [String],
      enum: ['desktop', 'mobile'],
      default: ['desktop', 'mobile'],
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    backgroundColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
    buttonColor: {
      type: String,
    },
    language: {
      type: String,
    },
    logo: {
      type: String,
    },
    site: {
      type: Schema.Types.ObjectId,
      ref: 'Site',
    },
    templateId: {
      type: String,
      required: true,
    },
    targetUrl: {
      url: {
        type: String,
      },
      matchType: {
        type: String,
        enum: ['simple', 'startsWith', 'endsWith', 'contains'],
      },
    },
    timing: {
      type: String,
      enum: ['immediate', 'delay', 'scroll'],
      default: 'immediate',
      required: true,
    },
    delayTime: {
      type: Number,
      required: function () {
        return this.timing === 'delay';
      },
    },
    frequency: {
      type: String,
      enum: ['submit', 'once', 'always'],
      default: 'submit',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Surveys', SurveysSchema);
