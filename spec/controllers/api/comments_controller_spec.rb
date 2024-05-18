require 'rails_helper'

RSpec.describe Api::CommentsController, type: :controller do
  let(:user) { create(:user) }
  let(:article) { create(:article, user:) }
  let(:comment) { create(:comment, user:, article:) }
  let(:valid_attributes) { { body: 'This is a comment.' } }
  let(:invalid_attributes) { { body: '' } }

  before do
    allow(controller).to receive(:authenticate).and_return(true)
    controller.instance_variable_set(:@current_user, user)
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index, params: { slug: article.slug }
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
      json_response = JSON.parse(response.body)
      expect(json_response['comments']).to be_an(Array)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Comment' do
        expect do
          post :create, params: { slug: article.slug, comment: valid_attributes }
        end.to change(Comment, :count).by(1)
      end

      it 'renders a JSON response with the new comment' do
        post :create, params: { slug: article.slug, comment: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
        json_response = JSON.parse(response.body)
        expect(json_response['comment']['body']).to eq(valid_attributes[:body])
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new comment' do
        post :create, params: { slug: article.slug, comment: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
        json_response = JSON.parse(response.body)
        expect(json_response['errors']).not_to be_empty
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested comment' do
      delete_comment = create(:comment, user:, article:)
      expect do
        delete :destroy, params: { slug: article.slug, id: delete_comment.id }
      end.to change(Comment, :count).by(-1)
    end

    it 'returns a success response' do
      delete_comment = create(:comment, user:, article:)
      delete :destroy, params: { slug: article.slug, id: delete_comment.id }
      expect(response).to have_http_status(:no_content)
    end
  end

  # JSONレスポンスをパースするためのヘルパーメソッド
  def json_response
    JSON.parse(response.body)
  end
end
