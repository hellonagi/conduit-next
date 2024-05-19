FactoryBot.define do
  factory :comment do
    body { 'This is a sample comment.' }
    association :user
    association :article
  end
end
