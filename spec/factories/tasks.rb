FactoryGirl.define do
  factory :task do
    application
    status 'Running'
    progress 55
    duration 3200
  end

end