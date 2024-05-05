class Article < ApplicationRecord
  belongs_to :user
  has_many :article_tags, dependent: :destroy
  has_many :tags, through: :article_tags
  default_scope -> { order(created_at: :desc) }
  before_validation :generate_slug, on: :create

  validates :title, presence: true, length: { maximum: 32 }
  validates :slug, presence: true
  validates :description, presence: true, length: { maximum: 128 }
  validates :body, presence: true, length: { maximum: 512 }
  validates :user_id, presence: true

  private

  def generate_slug
    slug_base = title ? title.parameterize : ''
    self.slug = "#{slug_base}-#{Time.now.to_i}"
  end
end
