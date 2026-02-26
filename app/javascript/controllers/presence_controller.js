import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static values = { conversationId: Number, currentUserId: Number }
  static targets = ["indicator"]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "PresenceChannel", conversation_id: this.conversationIdValue },
      {
        connected: () => this.startHeartbeat(),
        disconnected: () => this.stopHeartbeat(),
        received: (data) => this.handleReceived(data)
      }
    )
  }

  disconnect() {
    this.stopHeartbeat()
    this.channel?.unsubscribe()
  }

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.channel.perform("heartbeat")
    }, 15000)
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
  }

  handleReceived(data) {
    if (data.type === "presence") {
      const otherUserOnline = data.online_user_ids.some(
        id => id !== this.currentUserIdValue
      )
      this.indicatorTarget.textContent = otherUserOnline ? "● Online" : "● Offline"
      this.indicatorTarget.style.color = otherUserOnline ? "green" : "gray"
    }
  }
}
