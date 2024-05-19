User.create!(username: 'mike',
             email: 'mike@example.com',
             image: 'http://i.imgur.com/Qr71crq.jpg',
             bio: 'Quia illum libero magni.',
             password: 'password')

10.times do |n|
  username = Faker::Name.first_name.downcase
  email = "example-#{n + 1}@example.com"
  image = 'https://i.imgur.com/hepj9ZS.png'
  bio = Faker::Lorem.sentence(word_count: 5)
  password = 'password'
  User.create!(username:,
               email:,
               image:,
               bio:,
               password:)
end

users = User.order(:created_at).take(6)
20.times do
  users.each do |user|
    title = Faker::Lorem.sentence(word_count: 2)
    description = Faker::Lorem.sentence(word_count: 5)
    body = Faker::Lorem.paragraph(sentence_count: 6)
    user.articles.create!(title:, description:, body:)
  end
end

30.times do
  Tag.create!(name: Faker::Lorem.unique.characters(number: rand(2..10)))
end

Article.all.each do |article|
  tags = Tag.order('RANDOM()').limit(rand(1..5))
  tags.each do |tag|
    ArticleTag.create!(article_id: article.id, tag_id: tag.id)
  end

  rand(5..10).times do
    random_id = rand(1..11)
    user = User.find_by(id: random_id)
    Comment.create!(article_id: article.id, user_id: user.id, body: Faker::Lorem.paragraph(sentence_count: 5))
  end
end
