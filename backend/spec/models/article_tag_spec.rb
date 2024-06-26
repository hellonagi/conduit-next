require 'rails_helper'

RSpec.describe ArticleTag, type: :model do
  describe 'associations' do
    it { should belong_to(:article) }
    it { should belong_to(:tag) }
  end
end
