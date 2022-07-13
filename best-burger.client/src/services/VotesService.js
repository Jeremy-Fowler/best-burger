import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class VotesService {
  async getVotesByPollId(id) {
    const res = await api.get('api/polls/' + id + '/votes')
    AppState.votes = res.data
  }

  async create(body) {
    const res = await api.post('api/votes', body)
    // AppState.votes = AppState.votes.filter(v => v.accountId !== AppState.account.id)
    // AppState.votes.push(res.data)
  }
}

export const votesService = new VotesService()