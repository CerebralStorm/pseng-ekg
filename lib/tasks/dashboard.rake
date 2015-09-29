require 'httparty'

namespace :dashboard do

  task :get_logs => :environment do
    Task.running.find_each do |task|
      response = HTTParty.get("#{task.application.url}/pseng_log")
      if response.success?
        task.log = JSON.parse(response.body)['log']
        task.save
      end
    end
  end

end