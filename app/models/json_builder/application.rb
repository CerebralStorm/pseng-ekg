class JsonBuilder::Application
  attr_accessor :active_record_response, :params

  def initialize(active_record_response, params)
    @active_record_response = active_record_response.order('name ASC')
    @params = params
  end

  def json_hash
    if active_record_response.respond_to?(:each)
      result = []
      active_record_response.each do |active_record_response|
        result << application_hash(active_record_response)
      end
      result
    else
      application_hash(active_record_response)
    end
  end

  def application_hash(application)
    result_hash = application.attributes
    if params[:include].present?
      result_hash[:tasks] = application.tasks.send(scope) if params[:include].include?('tasks')
    end
    result_hash
  end

  def scope
    if params[:view] == 'daily'
      :daily
    elsif params[:view] == 'weekly'
      :weekly
    elsif params[:view] == 'monthly'
      :monthly
    end
  end
end
