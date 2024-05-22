class ApplicationController < ActionController::API
  def create_token(user_id)
    payload = { user_id:, exp: (DateTime.current + 7.days).to_i }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key, 'HS256')
  end

  def get_current_user
    @current_user ||= User.find(decoded_auth_token[0]['user_id'])
  end

  def authenticate
    if decoded_auth_token
      @current_user ||= User.find(decoded_auth_token[0]['user_id'])
    else
      render json: { error: 'Not Authenticated' }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end

  def decoded_auth_token
    return unless token.present?
    secret_key = Rails.application.credentials.secret_key_base
    @decoded_auth_token ||= JWT.decode(token, secret_key)
  end

  def token
    authorization_header = request.headers['Authorization']
    authorization_header.split(' ').last if authorization_header
  end
end
