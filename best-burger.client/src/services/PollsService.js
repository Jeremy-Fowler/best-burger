import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PollsService {

  clear() {
    AppState.activePoll = null
    AppState.answers = []
    AppState.votes = []
  }
  async getAll() {
    const res = await api.get('api/polls')
    logger.log(res.data)
    AppState.polls = res.data
  }
  async getById(id) {
    const res = await api.get('api/polls/' + id)
    logger.log(res.data)
    AppState.activePoll = res.data
  }
}

export const pollsService = new PollsService()