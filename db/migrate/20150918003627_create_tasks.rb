class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :application_id, index: true
      t.string :name
      t.string :status
      t.integer :progress
      t.integer :duration
      t.datetime :completed_at
      t.datetime :failed_at
      t.text :log

      t.timestamps
    end
  end
end
