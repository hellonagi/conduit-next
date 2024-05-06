class Api::ArticlesController < ApplicationController
  before_action :authenticate, only: %i[create]

  def index
    articles = filter_articles
    articles = articles.map { |article| build_article_response(article) }
    articles = {
      articles:,
      articlesCount: articles.length
    }
    render json: articles, status: :ok
  end

  def create
    @article = @current_user.articles.build(title: article_params[:title], description: article_params[:description],
                                            body: article_params[:body])
    if @article.save
      tag_list = article_params[:tagList]
      if tag_list.present?
        tags = tag_list.map(&:strip).uniq
        create_or_update_article_tags(@article, tags)
      end
      render json: { article: build_article_response(@article) }, status: :created
    else
      render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :body, tagList: [])
  end

  def build_article_response(article)
    {
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
  end

  def filter_articles
    articles = Article.all.order(created_at: :desc)
    articles = articles.where('tags.name = ?', params[:tag]) if params[:tag]
    articles = articles.joins(:user).where(users: { username: params[:author] }) if params[:author]
    if params[:favorited]
      articles = articles.joins(:favorites).where(favorites: { user_id: User.find_by(username: params[:favorited]).id })
    end
    articles.limit(params[:limit] || 20).offset(params[:offset] || 0)
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
