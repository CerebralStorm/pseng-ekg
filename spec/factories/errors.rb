FactoryGirl.define do
  factory :error do
    task_id 1
message "MyString"
backtrace "MyText"
  end

end
