import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AnswersService {
  async getAnswersByPollId(id) {
    const res = await api.get('api/polls/' + id + '/answers')
    logger.log(res.data)
    AppState.answers = res.data
  }
}

export const answersService = new AnswersService()