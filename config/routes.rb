# Rails.application.routes.draw do
#   namespace :api do
#     get '/user', to: 'users#show'
#     put '/user', to: 'users#update'
#     post '/users', to: 'users#create'
#     post '/users/login', to: 'authentication#login'
#     get '/profiles/:username', to: 'profiles#show'
#     post '/profiles/:username/follow', to: 'profiles#follow'
#     delete '/profiles/:username/follow', to: 'profiles#unfollow'
#     get '/articles', to: 'articles#index'
#     post '/articles', to: 'articles#create'
#     get 'articles/feed', to: 'articles#feed'
#     get '/articles/:slug', to: 'articles#show'
#     put '/articles/:slug', to: 'articles#update'
#     delete '/articles/:slug', to: 'articles#destroy'
#     get '/articles/:slug/comments', to: 'comments#index'
#     post '/articles/:slug/comments', to: 'comments#create'
#     delete '/articles/:slug/comments/:id', to: 'comments#destroy'
#     post 'articles/:slug/favorite', to: 'articles#favorite'
#     delete 'articles/:slug/favorite', to: 'articles#unfavorite'
#     get '/tags', to: 'articles#tags'
#   end
# end

Rails.application.routes.draw do
  namespace :api do
    # ユーザー関連のルーティング
    resource :user, only: %i[show update]
    resources :users, only: %i[create] do
      collection do
        post :login
      end
    end

    resources :profiles, param: :username, only: [] do
      member do
        get :show
        post :follow
        delete :follow, action: :unfollow
      end
    end

    resources :hoge, param: :slug, only: %i[index create show update destroy] do
      collection do
        get :feed
      end
      member do
        post :favorite
        delete :favorite, action: :unfavorite
        resources :comments, only: %i[index create destroy]
      end
      # # namespace :comments do
      # get '/comments/', to: 'comments#index'
      # post '/comments/', to: 'comments#create'
      # delete '/comments/:id', to: 'comments#destroy'
      # end
    end

    get '/tags', to: 'articles#tags'
  end
end
