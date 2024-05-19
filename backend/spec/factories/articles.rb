FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "Sample Article #{n}" }
    sequence(:description) { |n| "This is a sample article description #{n}." }
    sequence(:body) { |n| "This is the body of sample article #{n}." }
    user
  end
end
