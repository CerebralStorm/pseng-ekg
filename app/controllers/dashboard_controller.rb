class DashboardController < ApplicationController
  def show
    @applications = Application.all.includes(:tasks)
  end
end
