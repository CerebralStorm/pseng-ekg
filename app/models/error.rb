class Error < ActiveRecord::Base
  belongs_to :task, counter_cache: true

  validates :task, presence: true
  validates :message, presence: true

end
