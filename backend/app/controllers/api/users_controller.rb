class Api::UsersController < ApplicationController
  before_action :authenticate, only: %i[update show]

  def create
    @user = User.new(user_params)
    if @user.save
      render_user(@user, nil, :created)
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if @current_user
      render_user(@current_user, token, :ok)
    else
      render json: { errors: 'User not authenticated' }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.update(user_update_params)
      render_user(@current_user, token, :ok)
    else
      render json: { errors: @current_user ? @current_user.errors.full_messages : 'User not authenticated' },
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def user_update_params
    params.require(:user).permit(:username, :email, :image, :bio, :password)
  end

  def render_user(user, token, status)
    user_response = {
      user: {
        email: user.email,
        token:,
        username: user.username,
        bio: user.bio,
        image: user.image
      }
    }
    render json: user_response, status:
  end
end
