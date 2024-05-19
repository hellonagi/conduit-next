class Api::CommentsController < ApplicationController
  before_action :authenticate, only: %i[create destroy]

  def index
    article = Article.find_by(slug: params[:slug])
    comments = article.comments
    comments = comments.map { |comment| build_comment_response(comment) }
    render json: { comments: }, status: :ok
  end

  def create
    comment = @current_user.comments.build(comment_params)
    article = Article.find_by(slug: params[:slug])
    comment.article = article

    if comment.save
      render json: { comment: build_comment_response(comment) }, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    article = Article.find_by(slug: params[:slug])
    comments = article.comments
    delete_comment = comments.find_by(id: params[:id])
    if delete_comment.destroy
      head :no_content
    else
      render json: { errors: delete_comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def build_comment_response(comment)
    {
      id: comment.id,
      body: comment.body,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
      author: {
        username: comment.user.username,
        bio: comment.user.bio,
        image: comment.user.image
      }
    }
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
