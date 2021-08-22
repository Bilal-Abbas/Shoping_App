Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      post 'signup', :to =>'authentication#signup'
      post 'login', :to =>'authentication#login'
      resources :users
      resources :orders
      resources :products
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
