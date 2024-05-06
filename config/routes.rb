Rails.application.routes.draw do
  namespace :api do
    get '/user', to: 'users#show'
    post '/users', to: 'users#create'
    put '/user', to: 'users#update'
    get '/articles', to: 'articles#index'
    post '/articles', to: 'articles#create'
    get '/articles/:slug', to: 'articles#show'
    put '/articles/:slug', to: 'articles#update'
    delete '/articles/:slug', to: 'articles#destroy'
    get '/articles/:slug/comments', to: 'comments#index'
    post '/articles/:slug/comments', to: 'comments#create'
    post '/users/login', to: 'authentication#login'
  end
end
