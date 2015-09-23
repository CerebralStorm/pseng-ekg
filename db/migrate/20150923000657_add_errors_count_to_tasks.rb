class AddErrorsCountToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :errors_count, :integer
  end
end
