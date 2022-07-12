import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AnswerSchema = new Schema(
  {
    title: { type: String, required: true },
    pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)