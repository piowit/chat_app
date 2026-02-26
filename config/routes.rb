require "sidekiq/web"

Rails.application.routes.draw do
  resources :messages
  resources :participants
  resources :conversations
  resources :users
  mount Sidekiq::Web => "/sidekiq"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#home"
  post "select_user", to: "pages#select_user"
  delete "logout", to: "pages#logout"
  post "start_conversation", to: "pages#start_conversation"
end
