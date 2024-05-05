class Api::ArticlesController < ApplicationController
  before_action :authenticate, only: %i[create]

  def create
    @article = @current_user.articles.build(title: article_params[:title], description: article_params[:description],
                                            body: article_params[:body])
    if @article.save
      tag_list = article_params[:tagList]
      if tag_list.present?
        tags = tag_list.map(&:strip).uniq
        create_or_update_article_tags(@article, tags)
      end
      render_article(@article, :created)
    else
      render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :body, tagList: [])
  end

  def render_article(article, status)
    article_response = {
      article: {
        title: article.title,
        slug: article.slug,
        description: article.description,
        body: article.body,
        tagList: article.tags.map(&:name),
        createdAt: article.created_at,
        updatedAt: article.updated_at,
        author: {
          username: article.user.username,
          bio: article.user.bio,
          image: article.user.image
        }
      }
    }
    render json: article_response, status:
  end

  def create_or_update_article_tags(article, tags)
    article.tags.destroy_all

    tags.each do |tag|
      tag = Tag.find_or_create_by(name: tag)
      article.tags << tag
    rescue ActiveRecord::RecordInvalid
      false
    end
  end
end
