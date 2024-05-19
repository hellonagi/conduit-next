require 'rails_helper'

RSpec.describe User do
  subject { create(:user) }

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_length_of(:username).is_at_most(50) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_presence_of(:email) }
    it { should validate_length_of(:email).is_at_most(255) }
    it { should allow_value('user@example.com', 'test.user@gmail.com', 'test_user123@example.co.jp').for(:email) }
    it { should_not allow_value('userexample', 'user@example', 'user@.com', 'user@com').for(:email) }
    it { should have_secure_password }
    it { should validate_length_of(:password).is_at_least(8) }

    context 'when updating the user' do
      it 'is valid without changing the password' do
        user.username = 'new_username'
        expect(user).to be_valid
      end

      it 'is valid with a new password of valid length' do
        user.password = 'newpassword123'
        user.password_confirmation = 'newpassword123'
        expect(user).to be_valid
      end

      it 'is invalid with a new password of insufficient length' do
        user.password = 'short'
        user.password_confirmation = 'short'
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include('is too short (minimum is 8 characters)')
      end
    end
  end

  describe 'associations' do
    it { should have_many(:articles).dependent(:destroy) }
    it { should have_many(:comments).dependent(:destroy) }
    it { should have_many(:favorites).dependent(:destroy) }
    it { should have_many(:favorite_articles).through(:favorites).source(:article) }
    it { should have_many(:following_relationships).class_name('Relationship').with_foreign_key('user_id').dependent(:destroy) }
    it { should have_many(:following).through(:following_relationships).source(:follow) }
    it { should have_many(:followers_relationships).class_name('Relationship').with_foreign_key('follow_id').dependent(:destroy) }
    it { should have_many(:followers).through(:followers_relationships).source(:user) }
  end

  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:article) { create(:article, user: user) }
  let(:other_article) { create(:article, user: other_user) }

  describe '#feed' do
    it 'returns articles created by the user' do
      user.articles << article
      expect(user.feed).to include(article)
      expect(user.feed).not_to include(other_article)
    end
  end

  describe '#follow' do
    it 'follows another user' do
      expect { user.follow(other_user) }.to change { user.following.count }.by(1)
    end

    it 'does not follow self' do
      expect { user.follow(user) }.not_to change { user.following.count }
    end
  end

  describe '#unfollow' do
    before { user.follow(other_user) }

    it 'unfollows another user' do
      expect { user.unfollow(other_user) }.to change { user.following.count }.by(-1)
    end
  end

  describe '#following?' do
    before { user.follow(other_user) }

    it 'returns true if following the user' do
      expect(user.following?(other_user)).to be true
    end

    it 'returns false if not following the user' do
      user.unfollow(other_user)
      expect(user.following?(other_user)).to be false
    end
  end

  describe '#add_favorite' do
    it 'adds an article to favorites' do
      expect { user.add_favorite(other_article) }.to change { user.favorite_articles.count }.by(1)
    end
  end

  describe '#remove_favorite' do
    before { user.add_favorite(other_article) }

    it 'removes an article from favorites' do
      expect { user.remove_favorite(other_article) }.to change { user.favorite_articles.count }.by(-1)
    end
  end

  describe '#favorite?' do
    before { user.add_favorite(other_article) }

    it 'returns true if the article is favorited' do
      expect(user.favorite?(other_article)).to be true
    end

    it 'returns false if the article is not favorited' do
      user.remove_favorite(other_article)
      expect(user.favorite?(other_article)).to be false
    end
  end

  describe '#following_articles' do
    before { user.follow(other_user) }

    it 'returns articles from followed users' do
      other_user.articles << other_article
      expect(user.following_articles).to include(other_article)
    end

    it 'does not return articles from unfollowed users' do
      user.following_relationships.destroy_all
      other_user.articles << other_article
      expect(user.following_articles).not_to include(other_article)
    end
  end
end
