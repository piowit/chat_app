import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static values = { conversationId: Number, currentUserId: Number }
  static targets = ["input", "indicator"]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "TypingChannel", conversation_id: this.conversationIdValue },
      { received: (data) => this.handleReceived(data) }
    )
  }

  disconnect() {
    this.channel?.unsubscribe()
  }

  onInput() {
    if (this.throttleTimeout) return

    this.channel.perform("typing")
    this.throttleTimeout = setTimeout(() => {
      this.throttleTimeout = null
    }, 500)
  }

  handleReceived(data) {
    if (data.type !== "typing") return
    if (data.user_id === this.currentUserIdValue) return

    this.indicatorTarget.textContent = `${data.username} is typing...`

    clearTimeout(this.clearIndicatorTimeout)
    this.clearIndicatorTimeout = setTimeout(() => {
      this.indicatorTarget.textContent = ""
    }, 2000)
  }
}
