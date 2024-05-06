class Api::ProfilesController < ApplicationController
  def show
    user = User.find_by(username: params[:username])
    if user
      render json: { profile: user }, status: :ok
    else
      render json: { errors: { body: user.errors } }, status: :unprocessable_entity
    end
  end

  private

  def build_profile_response(profile)
    {
      username: profile.username,
      bio: profile.bio,
      image: profile.image
    }
  end
end
