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
    AppState.polls = res.data
  }
  async getById(id) {
    const res = await api.get('api/polls/' + id)
    AppState.activePoll = res.data
  }

  async create(body) {
    const res = await api.post('api/polls', body)
    logger.log(res.data)
    AppState.polls.push(res.data)
  }
}

export const pollsService = new PollsService()