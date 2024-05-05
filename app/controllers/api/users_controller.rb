class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      user_response = {
        user: {
          email: @user.email,
          username: @user.username,
          bio: @user.bio,
          image: @user.image
        }
      }
      render json: user_response, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
