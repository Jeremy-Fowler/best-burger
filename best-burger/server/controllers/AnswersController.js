import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class AnswersController extends BaseController {
  constructor () {
    super('api/answers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

}