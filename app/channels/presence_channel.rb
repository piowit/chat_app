class PresenceChannel < ApplicationCable::Channel
  PRESENCE_TTL = 30

  def subscribed
    @conversation = Conversation.find(params[:conversation_id])
    stream_for @conversation

    mark_online
    broadcast_presence
  end

  def unsubscribed
    mark_offline
    broadcast_presence
  end

  def heartbeat
    mark_online
    broadcast_presence
  end

  private

  def mark_online
    REDIS.set(presence_key, "1", ex: PRESENCE_TTL)
  end

  def mark_offline
    REDIS.del(presence_key)
  end

  def presence_key
    "presence:conversation:#{@conversation.id}:user:#{current_user.id}"
  end

  def online_user_ids
    @conversation.participants.pluck(:user_id).select do |user_id|
      REDIS.exists?("presence:conversation:#{@conversation.id}:user:#{user_id}")
    end
  end

  def broadcast_presence
    PresenceChannel.broadcast_to(@conversation, {
      type: "presence",
      online_user_ids: online_user_ids
    })
  end
end
