module PusherCallbacks
  extend ActiveSupport::Concern

  included do
    after_create :send_pusher_create_message
    after_update :send_pusher_update_message
    before_destroy :send_pusher_delete_message
  end

  def send_pusher_update_message
    Pusher.trigger("#{self.class.to_s.downcase}_channel", 'update', self.attributes)
  end

  def send_pusher_create_message
    Pusher.trigger("#{self.class.to_s.downcase}_channel", 'create', self.attributes)
  end

  def send_pusher_delete_message
    Pusher.trigger("#{self.class.to_s.downcase}_channel", 'delete', self.attributes)
  end

end