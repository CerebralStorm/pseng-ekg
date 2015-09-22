class Task < ActiveRecord::Base
  belongs_to :application

  STATUSES = %w(Running Completed Failed)
  validates :application, presence: true
  validates :status, inclusion: { in: STATUSES }

  has_many :task_errors, class_name: 'Error', dependent: :destroy

  def self.weekly
    begin_date = 7.days.ago.beginning_of_day
    end_date = Date.today.end_of_day
    where(created_at: begin_date..end_date)
  end

  def self.daily
    begin_date = Date.today.beginning_of_day
    end_date = Date.today.end_of_day
    where(created_at: begin_date..end_date)
  end

  def self.monthly
    begin_date = 1.month.ago.beginning_of_day
    end_date = Date.today.end_of_day
    where(created_at: begin_date..end_date)
  end

  def self.completed
    where(status: 'Completed')
  end

  def self.running
    where(status: 'Running')
  end

  def self.failed
    where(status: 'Failed')
  end
end
