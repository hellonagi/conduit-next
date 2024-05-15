require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(2).is_at_most(32) }
  end

  describe 'associations' do
    it { should have_many(:article_tags).dependent(:destroy) }
    it { should have_many(:articles).through(:article_tags) }
  end
end
