import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor () {
    super()
    this
      .on('error', this.onError)
      .on('joined_room', this.joinedRoom)
      .on('new_vote', this.newVote)
      .on('notification', this.notification)
  }
  notification(payload) {
    Pop.toast(payload.message)
  }
  newVote(payload) {
    logger.log(payload)
    AppState.votes = AppState.votes.filter(v => v.accountId !== payload.accountId)
    AppState.votes.push(payload)
  }

  joinedRoom(payload) {
    logger.log(`You joined ${payload.room}`)
  }
  joinRoom(room) {
    this.emit('join_room', { room })
  }

  leaveRoom(room) {
    this.emit('leave_room', { room })
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
