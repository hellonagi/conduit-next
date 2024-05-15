require 'rails_helper'

RSpec.describe Article, type: :model do
  let(:user) { create(:user) }
  let(:article) { create(:article, user:) }

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_most(32) }
    it { should validate_presence_of(:description) }
    it { should validate_length_of(:description).is_at_most(128) }
    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_most(512) }
    it { should validate_presence_of(:user_id) }

    it 'validates presence of slug' do
      article.slug = ''
      expect(article).not_to be_valid
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:article_tags).dependent(:destroy) }
    it { should have_many(:tags).through(:article_tags) }
    it { should have_many(:comments).dependent(:destroy) }
    it { should have_many(:favorites).dependent(:destroy) }
    it { should have_many(:users_favorites).through(:favorites).source(:user) }
  end

  describe 'default scope' do
    it 'orders by created_at in descending order' do
      article1 = create(:article, created_at: 1.day.ago, user:)
      article2 = create(:article, created_at: 2.days.ago, user:)
      expect(Article.all).to eq([article, article1, article2])
    end
  end

  describe 'callbacks' do
    it 'generates a slug before validation on create' do
      new_article = Article.new(title: 'Test Title', description: 'Test Description', body: 'Test Body', user:)
      new_article.valid?
      expect(new_article.slug).to match(/^test-title-\d+$/)
    end
  end
end
