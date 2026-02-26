import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { currentUserId: Number }
  static targets = ["message"]

  messageTargetConnected(element) {
    const messageAuthorId = parseInt(element.dataset.userId)
    const messageIsMine = messageAuthorId === this.currentUserIdValue
    element.style.justifyContent = messageIsMine ? "flex-end" : "flex-start"
    element.querySelector(".message-bubble").style.background = messageIsMine ? "#d4edda" : "#e2e3e5"
  }
}
