class CreateRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :relationships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :follow, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
    add_index :relationships, %i[user_id follow_id], unique: true
  end
end
