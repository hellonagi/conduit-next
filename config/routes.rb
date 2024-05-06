Rails.application.routes.draw do
  namespace :api do
    get '/user', to: 'users#show'
    post '/users', to: 'users#create'
    put '/user', to: 'users#update'
    get '/articles', to: 'articles#index'
    get '/articles/:slug', to: 'articles#show'
    put '/articles/:slug', to: 'articles#update'
    post '/articles', to: 'articles#create'
    post '/users/login', to: 'authentication#login'
  end
end
