class Tag < ApplicationRecord
  has_many :article_tags, dependent: :destroy
  has_many :articles, through: :article_tags

  validates :name, presence: true, length: { minimum: 2, maximum: 32 }

  def self.popular(limit = 10)
    Tag.joins(:article_tags)
       .group('tags.id')
       .order('COUNT(article_tags.tag_id) DESC')
       .limit(limit)
  end
end
