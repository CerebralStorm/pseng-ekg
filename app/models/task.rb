class Task < ActiveRecord::Base
  belongs_to :application

  validates :application, presence: true
end
