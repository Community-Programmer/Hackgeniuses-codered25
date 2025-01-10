import mongoose from 'mongoose';

const QuestionItemSchema = new mongoose.Schema({
  questionNo: { type: Number, required: true },
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  answer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema(
  {
    testName: { type: String, required: true },
    testDescription: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    questions: { type: [QuestionItemSchema], required: true },
    difficulty: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    roadMapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roadmaps',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', QuizSchema);
