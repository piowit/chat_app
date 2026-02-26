class CreateParticipants < ActiveRecord::Migration[7.1]
  def change
    create_table :participants do |t|
      t.references :user, null: false, foreign_key: true
      t.references :conversation, null: false, foreign_key: true

      t.timestamps
    end

    add_index :participants, [:user_id, :conversation_id], unique: true
  end
end
