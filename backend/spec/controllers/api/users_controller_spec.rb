require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let(:valid_attributes) do
    {
      username: Faker::Internet.username,
      email: Faker::Internet.email,
      password: 'password'
    }
  end

  let(:invalid_attributes) do
    {
      username: '',
      email: '',
      password: ''
    }
  end

  def authenticate_user(user)
    allow(controller).to receive(:authenticate).and_return(true)
    controller.instance_variable_set(:@current_user, user)
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new User' do
        expect do
          post :create, params: { user: valid_attributes }
        end.to change(User, :count).by(1)
      end

      it 'renders a JSON response with the new user' do
        post :create, params: { user: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
        expect(json_response['user']['email']).to eq(valid_attributes[:email])
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new user' do
        post :create, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
        expect(json_response['errors']).not_to be_empty
      end
    end
  end

  describe 'GET #show' do
    let(:user) { create(:user) }

    context 'with valid authentication' do
      before do
        authenticate_user(user)
      end

      it 'returns a success response' do
        get :show
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include('application/json')
        expect(json_response['user']['email']).to eq(user.email)
      end
    end

    context 'without valid authentication' do
      it 'returns an unauthorized response' do
        get :show
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PUT #update' do
    let(:user) { create(:user) }
    let(:new_attributes) do
      {
        username: 'newusername',
        email: 'newemail@example.com',
        bio: 'New bio',
        image: 'new_image_url'
      }
    end

    context 'with valid params' do
      before do
        authenticate_user(user)
      end

      it 'updates the requested user' do
        put :update, params: { user: new_attributes }
        user.reload
        expect(user.username).to eq(new_attributes[:username])
        expect(user.email).to eq(new_attributes[:email])
        expect(user.bio).to eq(new_attributes[:bio])
        expect(user.image).to eq(new_attributes[:image])
      end

      it 'renders a JSON response with the user' do
        put :update, params: { user: new_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include('application/json')
        expect(json_response['user']['username']).to eq(new_attributes[:username])
      end
    end

    context 'with invalid params' do
      before do
        authenticate_user(user)
      end

      it 'renders a JSON response with errors for the user' do
        put :update, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
        expect(json_response['errors']).not_to be_empty
      end
    end
  end
end

def json_response
  JSON.parse(response.body)
end
