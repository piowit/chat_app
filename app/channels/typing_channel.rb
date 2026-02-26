class TypingChannel < ApplicationCable::Channel
  def subscribed
    @conversation = Conversation.find(params[:conversation_id])
    stream_for @conversation
  end

  def typing
    TypingChannel.broadcast_to(@conversation, {
      type: "typing",
      username: current_user.username,
      user_id: current_user.id
    })
  end
end
