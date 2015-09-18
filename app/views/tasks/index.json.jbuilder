json.array!(@tasks) do |task|
  json.extract! task, :id, :application_id, :status, :progress, :duration
  json.url task_url(task, format: :json)
end
