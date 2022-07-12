import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AnswerSchema } from '../models/Answer';
import { PollSchema } from '../models/Poll';
import { ValueSchema } from '../models/Value'
import { VoteSchema } from '../models/Vote';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Polls = mongoose.model('Poll', PollSchema);
  Answers = mongoose.model('Answer', AnswerSchema);
  Votes = mongoose.model('Vote', VoteSchema);

}

export const dbContext = new DbContext()
