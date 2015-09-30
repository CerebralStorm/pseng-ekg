class Log < ActiveRecord::Base
  include PusherCallbacks

  belongs_to :task
end
