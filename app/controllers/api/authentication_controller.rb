class Api::AuthenticationController < ApplicationController
  def login
    @user = User.find_by_email(params[:user][:email])
    if @user&.authenticate(params[:user][:password])
      token = create_token(@user.id)
      user_response = {
        user: {
          email: @user.email,
          token:,
          username: @user.username,
          bio: @user.bio,
          image: @user.image
        }
      }
      render json: user_response, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unauthorized
    end
  end
end
