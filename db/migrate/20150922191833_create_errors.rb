class CreateErrors < ActiveRecord::Migration
  def change
    create_table :errors do |t|
      t.integer :task_id, index: true
      t.string :message
      t.text :backtrace

      t.timestamps
    end
  end
end
