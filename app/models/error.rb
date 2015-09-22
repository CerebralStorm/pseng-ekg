class Error < ActiveRecord::Base
  belongs_to :task

  validates :task, presence: true
  validates :message, presence: true
end
