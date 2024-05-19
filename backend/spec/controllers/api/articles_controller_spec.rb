require 'rails_helper'

RSpec.describe Api::ArticlesController, type: :controller do
  let(:user) { create(:user) }
  let(:valid_attributes) { { title: 'Test Title', description: 'Test Description', body: 'Test Body' } }
  let(:invalid_attributes) { { title: '', description: '', body: '' } }
  let(:article) { create(:article, user: user) }

  before do
    allow(controller).to receive(:authenticate).and_return(true)
    controller.instance_variable_set(:@current_user, user)
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      get :show, params: { slug: article.slug }
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
      expect(json_response['article']['title']).to eq(article.title)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Article' do
        expect do
          post :create, params: { article: valid_attributes }
        end.to change(Article, :count).by(1)
      end

      it 'renders a JSON response with the new article' do
        post :create, params: { article: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
        expect(json_response['article']['title']).to eq(valid_attributes[:title])
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new article' do
        post :create, params: { article: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
        expect(json_response['errors']).not_to be_empty
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      it 'updates the requested article' do
        put :update, params: { slug: article.slug, article: valid_attributes }
        article.reload
        expect(article.title).to eq(valid_attributes[:title])
        expect(article.description).to eq(valid_attributes[:description])
        expect(article.body).to eq(valid_attributes[:body])
      end

      it 'renders a JSON response with the updated article' do
        put :update, params: { slug: article.slug, article: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
        expect(json_response['article']['title']).to eq(valid_attributes[:title])
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the updated article' do
        put :update, params: { slug: article.slug, article: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
        expect(json_response['errors']).not_to be_empty
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested article' do
      article_to_delete = create(:article, user: user)
      expect do
        delete :destroy, params: { slug: article_to_delete.slug }
      end.to change(Article, :count).by(-1)
    end
  end

  describe 'POST #favorite' do
    it 'favorites the requested article' do
      post :favorite, params: { slug: article.slug }
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
      expect(json_response['article']['favorited']).to be_truthy
    end
  end

  describe 'DELETE #unfavorite' do
    it 'unfavorites the requested article' do
      user.add_favorite(article)
      delete :unfavorite, params: { slug: article.slug }
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
      expect(json_response['article']['favorited']).to be_falsey
    end
  end

  describe 'GET #feed' do
    it 'returns a success response' do
      get :feed
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
    end
  end

  describe 'GET #tags' do
    it 'returns a success response' do
      get :tags
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')
      expect(json_response['tags']).to be_an(Array)
    end
  end
end

# JSONレスポンスをパースするためのヘルパーメソッド
def json_response
  JSON.parse(response.body)
end
