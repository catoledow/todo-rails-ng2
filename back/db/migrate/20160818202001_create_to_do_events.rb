class CreateToDoEvents < ActiveRecord::Migration
  def change
    create_table :to_do_events do |t|
      t.string :type
      t.string :details

      t.timestamps null: false
    end
  end
end
