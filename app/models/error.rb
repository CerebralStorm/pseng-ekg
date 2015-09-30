class Error < ActiveRecord::Base
  include PusherCallbacks

  belongs_to :task, counter_cache: true

  validates :task, presence: true
  validates :message, presence: true

end
