FactoryGirl.define do
  factory :application do
    sequence :name do |n|
      "Application #{n}"
    end
  end

end