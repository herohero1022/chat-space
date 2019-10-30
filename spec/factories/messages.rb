FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/masumi_190621sleepcat01.jpeg")}
    user
    group
  end
end