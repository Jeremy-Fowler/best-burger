import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor () {
    super()
    this
      .on('error', this.onError)
      .on('joined', this.joinedRoom)
      .on('new_vote', this.newVote)
  }
  // INCOMING
  joinedRoom(payload) {
    logger.log('joined:room', payload)
  }

  newVote(payload) {
    AppState.votes = AppState.votes.filter(v => v.accountId !== payload.accountId)
    AppState.votes.push(payload)
  }

  // OUTGOING
  joinRoom(room) {
    logger.log('room name:', room)
    this.emit('JOIN_ROOM', { room })
  }
  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
