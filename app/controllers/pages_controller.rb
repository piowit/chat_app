class PagesController < ApplicationController
  def home
    @current_user = User.find_by(id: session[:user_id])
    @users = User.all

    if @current_user
      @other_users = User.where.not(id: @current_user.id)
      @conversations = @current_user.conversations.includes(:users, :messages)
    end
  end

  def select_user
    session[:user_id] = params[:user_id]
    cookies.signed[:user_id] = params[:user_id]
    redirect_to root_path
  end

  def logout
    session.delete(:user_id)
    cookies.delete(:user_id)
    redirect_to root_path
  end

  def start_conversation
    current_user = User.find(session[:user_id])
    other_user = User.find(params[:other_user_id])

    conversation = Conversation.joins(:participants)
      .where(participants: { user_id: current_user.id })
      .where(id: Conversation.joins(:participants).where(participants: { user_id: other_user.id }))
      .first

    unless conversation
      conversation = Conversation.create!
      conversation.participants.create!(user: current_user)
      conversation.participants.create!(user: other_user)
    end

    redirect_to conversation_path(conversation)
  end
end
