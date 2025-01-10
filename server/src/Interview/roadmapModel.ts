import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  lessonNumber: {
    type: Number,
    required: true,
  },
  lessonName: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  topic: [
    {
      type: String,
      required: true,
    },
  ],
});

const RoadMapSchema = new mongoose.Schema(
  {
    Image: {
      type: String,
      required: true,
    },
    RoadMapFor: {
      type: String,
      required: true,
    },
    Outcome: {
      type: String,
      required: true,
    },
    RoadMap: [LessonSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('RoadMap', RoadMapSchema);
