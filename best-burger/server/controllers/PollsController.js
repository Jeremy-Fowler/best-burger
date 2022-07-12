import { Auth0Provider } from "@bcwdev/auth0provider";
import { answersService } from "../services/AnswersService";
import { pollsService } from "../services/PollsService";
import { votesService } from "../services/VotesService";
import BaseController from "../utils/BaseController";

export class PollsController extends BaseController {
  constructor () {
    super('api/polls')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/answers', this.getAnswersByPollId)
      .get('/:id/votes', this.getVotesByPollId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.close)
  }
  async getAll(req, res, next) {
    try {
      const polls = await pollsService.getAll(req.query)
      return res.send(polls)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const poll = await pollsService.getById(req.params.id)
      return res.send(poll)
    } catch (error) {
      next(error)
    }
  }
  async getAnswersByPollId(req, res, next) {
    try {
      const answers = await answersService.getAnswersByPollId(req.params.id)
      return res.send(answers)
    } catch (error) {
      next(error)
    }
  }
  async getVotesByPollId(req, res, next) {
    try {
      const votes = await votesService.getVotesByPollId(req.params.id)
      return res.send(votes)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const poll = await pollsService.create(req.body)
      return res.send(poll)
    } catch (error) {
      next(error)
    }
  }
  async close(req, res, next) {
    try {
      const message = await pollsService.close(req.userInfo.id, req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}