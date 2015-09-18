class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token
  before_action :authorize_action

  def authorize_action
    if params[:format] == 'json'
      #TODO check HMAC
    else
      CASClient::Frameworks::Rails::Filter
    end
  end
end
