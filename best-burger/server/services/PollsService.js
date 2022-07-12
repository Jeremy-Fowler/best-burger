import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { answersService } from "./AnswersService";

class PollsService {
  async getAll(query) {
    const polls = await dbContext.Polls.find(query).populate('creator', 'name picture')
    return polls
  }
  async getById(id) {
    const poll = await dbContext.Polls.findById(id).populate('creator', 'name picture')
    if (!poll) {
      throw new BadRequest('No poll found')
    }
    return poll
  }
  async create(body) {
    const poll = await dbContext.Polls.create(body)
    await poll.populate('creator', 'name picture')
    body.id = poll.id
    await answersService.create(body)
    return poll
  }
  async close(userId, id) {
    const poll = await this.getById(id)
    if (poll.creatorId.toString() !== userId) {
      throw new Forbidden('Not your poll')
    }
    poll.isOpen = false
    await poll.save()
    return `The poll '${poll.question}' is now closed`
  }

}

export const pollsService = new PollsService()