import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PollSchema = new Schema(
  {
    question: { type: String, required: true },
    isOpen: { type: Boolean, required: true, default: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PollSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
