class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.integer :task_id, index: true
      t.text :value

      t.timestamps null: false
    end
  end
end
