Rails.application.routes.draw do
  namespace :api do
    resource :user, only: %i[show update]
    resources :users, only: %i[create] do
      collection do
        post :login, to: 'authentication#login'
      end
    end

    resources :profiles, param: :username, only: [:show] do
      member do
        post :follow
        delete :follow, action: :unfollow
      end
    end

    resources :articles, param: :slug, only: %i[index create show update destroy] do
      collection do
        get :feed
      end
      member do
        post :favorite
        delete :favorite, action: :unfavorite
        resources :comments, only: %i[index create destroy]
      end
    end

    get '/tags', to: 'articles#tags'
  end
end
