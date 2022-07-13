import { SocketHandler } from '../utils/SocketHandler'

export class TestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor (io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on('JOIN_ROOM', this.joinRoom)
  }
  joinRoom(payload) {
    if (!payload.room) {
      this.socket.emit("error", { message: 'Please provide a room name' })
    }
    this.socket.join(payload.room)
    this.socket.emit('joined', payload)
  }

  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }
}
