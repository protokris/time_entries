Rails.application.routes.draw do

  # API - JSON only, REST, Authenticated
  scope :format => true, :constraints => { :format => 'json' } do
    resources :time_entries
    resources :users
    resources :logins, only: [:create]
    resources :week_summaries, only: [:index]
    resources :day_summaries, only: [:index]
  end

  # Allow unauthenticated auth requests
  match '/user_tokens', to: 'user_tokens#create', via: :post

  # Always route UI to load react
  root to: 'react#index'
  get '*path', to: 'react#index'

end
