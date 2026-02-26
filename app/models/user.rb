class User < ApplicationRecord
  has_many :participants, dependent: :destroy
  has_many :conversations, through: :participants
  has_many :messages, dependent: :destroy

  validates :username, presence: true, uniqueness: true
end
