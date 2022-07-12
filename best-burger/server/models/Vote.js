import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const VoteSchema = new Schema(
  {
    answerId: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
    pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

VoteSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
