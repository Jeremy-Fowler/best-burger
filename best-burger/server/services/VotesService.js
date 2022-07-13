import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { pollsService } from "./PollsService"

class VotesService {
  async create(body) {
    const poll = await pollsService.getById(body.pollId)
    if (!poll.isOpen) {
      throw new BadRequest('Poll is already closed')
    }
    // NOTE findOneAndUpdate({_id: id}, body, {upsert: true, new true})
    const foundVote = await dbContext.Votes.findOne({ pollId: body.pollId, accountId: body.accountId })
    if (foundVote && foundVote.answerId.toString() == body.answerId) {
      throw new BadRequest('Already voted for this answer')
    } else if (foundVote) {
      await this.delete(foundVote.id)
    }
    const vote = await dbContext.Votes.create(body)
    await vote.populate('account', 'name, picture')
    return vote
  }
  async getVotesByPollId(pollId) {
    const votes = await dbContext.Votes.find({ pollId }).populate('account', 'name picture')
    return votes
  }

  async delete(id) {
    await dbContext.Votes.findByIdAndDelete(id)
  }

}

export const votesService = new VotesService()