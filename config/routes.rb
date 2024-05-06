Rails.application.routes.draw do
  namespace :api do
    post '/users', to: 'users#create'
    put '/user', to: 'users#update'
    get '/user', to: 'users#show'
    get '/articles', to: 'articles#index'
    get '/articles/:slug', to: 'articles#show'
    post '/articles', to: 'articles#create'
    post '/users/login', to: 'authentication#login'
  end
end
