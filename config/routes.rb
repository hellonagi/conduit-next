Rails.application.routes.draw do
  namespace :api do
    post '/users', to: 'users#create'
  end
end
