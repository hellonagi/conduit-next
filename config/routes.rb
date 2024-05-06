Rails.application.routes.draw do
  namespace :api do
    get '/user', to: 'users#show'
    post '/users', to: 'users#create'
    put '/user', to: 'users#update'
    get '/profiles/:username', to: 'profiles#show'
    post '/profiles/:username/follow', to: 'profiles#follow'
    delete '/profiles/:username/follow', to: 'profiles#unfollow'
    get '/articles', to: 'articles#index'
    post '/articles', to: 'articles#create'
    get '/articles/:slug', to: 'articles#show'
    put '/articles/:slug', to: 'articles#update'
    delete '/articles/:slug', to: 'articles#destroy'
    get '/articles/:slug/comments', to: 'comments#index'
    post '/articles/:slug/comments', to: 'comments#create'
    delete '/articles/:slug/comments/:id', to: 'comments#destroy'
    get '/tags', to: 'articles#tags'
    post '/users/login', to: 'authentication#login'
  end
end
