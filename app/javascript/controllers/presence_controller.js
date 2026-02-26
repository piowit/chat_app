import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static values = { conversationId: Number, currentUserId: Number }

  connect() {
    this.indicator = document.createElement("span")
    this.element.appendChild(this.indicator)

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
    if (data.type !== "presence") return

    const otherUserOnline = data.online_user_ids.some(
      id => id !== this.currentUserIdValue
    )
    this.indicator.textContent = otherUserOnline ? "● Online" : "● Offline"
    this.indicator.style.color = otherUserOnline ? "green" : "gray"
  }
}
