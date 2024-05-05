class ApplicationController < ActionController::API
  def create_token(user_id)
    payload = { user_id:, exp: (DateTime.current + 7.days).to_i }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key, 'HS256')
  end

  def authenticate
    @current_user ||= User.find(decoded_auth_token[0]['user_id']) if decoded_auth_token
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def decoded_auth_token
    secret_key = Rails.application.credentials.secret_key_base
    @decoded_auth_token ||= JWT.decode(token, secret_key)
  end

  def token
    request.headers['Authorization'].split(' ').last
  end
end
