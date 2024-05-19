require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  describe 'POST #login' do
    let(:user) { create(:user, password: 'password') }
    let(:valid_credentials) { { user: { email: user.email, password: 'password' } } }
    let(:invalid_credentials) { { user: { email: user.email, password: 'wrongpassword' } } }

    context 'with valid credentials' do
      it 'returns a success response with token' do
        post :login, params: valid_credentials
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include('application/json')
        json_response = JSON.parse(response.body)
        expect(json_response['user']['email']).to eq(user.email)
        expect(json_response['user']['token']).not_to be_nil
      end
    end

    context 'with invalid credentials' do
      it 'returns an unauthorized response' do
        post :login, params: invalid_credentials
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to include('application/json')
        json_response = JSON.parse(response.body)
        expect(json_response['errors']).to include('Invalid email or password')
      end
    end
  end
end
