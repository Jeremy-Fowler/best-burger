import { Auth0Provider } from "@bcwdev/auth0provider";
import { votesService } from "../services/VotesService";
import { socketProvider } from "../SocketProvider";
import BaseController from "../utils/BaseController";

export class VotesController extends BaseController {
  constructor () {
    super('api/votes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const vote = await votesService.create(req.body)
      socketProvider.messageRoom(req.body.pollId, 'new_vote', vote)
      return res.send(vote)
    } catch (error) {
      next(error)
    }
  }
}