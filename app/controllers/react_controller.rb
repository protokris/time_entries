class ReactController < ApplicationController
  protect_from_forgery with: :exception

  skip_before_action :authenticate_user, only: [:index]

  def index
  end
  
end
