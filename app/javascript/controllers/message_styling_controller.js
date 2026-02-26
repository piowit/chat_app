import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { currentUserId: Number }
  static targets = ["message"]

  messageTargetConnected(element) {
    const mine = parseInt(element.dataset.userId) === this.currentUserIdValue
    element.style.justifyContent = mine ? "flex-end" : "flex-start"
    element.querySelector(".message-bubble").style.background = mine ? "#d4edda" : "#e2e3e5"
  }
}
