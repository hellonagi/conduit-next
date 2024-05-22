class Api::ProfilesController < ApplicationController
  before_action :authenticate, only: %i[follow unfollow]
  before_action :get_current_user, only: %i[show]

  def show
    user = User.find_by(username: params[:username])
    is_following = if @current_user
                     @current_user.following?(user)
                   else
                     false
                   end

    if user
      render json: { profile: build_profile_response(user, is_following) }, status: :ok
    else
      render json: { errors: { body: user.errors } }, status: :unprocessable_entity
    end
  end

  def follow
    user = User.find_by(username: params[:username])

    if user.nil?
      render json: { errors: { body: ['User you want to follow not found'] } }, status: :not_found
      return
    end

    if @current_user.following?(user)
      render json: { errors: { body: ['You are already following this user'] } }, status: :unprocessable_entity
    else
      begin
        @current_user.follow(user)
        render json: { profile: build_profile_response(user, @current_user.following?(user)) }, status: :ok
      rescue StandardError
        render json: { errors: { body: user.errors } }, status: :unprocessable_entity
      end
    end
  end

  def unfollow
    user = User.find_by(username: params[:username])

    if user.nil?
      render json: { errors: { body: ['User not found'] } }, status: :not_found
      return
    end

    unless @current_user.following?(user)
      render json: { errors: { body: ["You are not following this user"] } }, status: :unprocessable_entity
    else
      begin
        @current_user.unfollow(user)
        render json: { profile: build_profile_response(user, @current_user.following?(user)) }, status: :ok
      rescue StandardError
        render json: { errors: { body: user.errors } }, status: :unprocessable_entity
      end
    end
  end

  private

  def build_profile_response(profile, is_following)
    {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: is_following
    }
  end
end
