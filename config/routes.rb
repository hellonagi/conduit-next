Rails.application.routes.draw do
  namespace :api do
    post '/users', to: 'users#create'
    put '/user', to: 'users#update'
    post '/users/login', to: 'authentication#login'
  end
end
