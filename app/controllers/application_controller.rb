class ApplicationController < ActionController::Base
  include Knock::Authenticable
  include Pundit

  before_action :authenticate_user

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    render json: {errors: {id: 'User does not have authorization for this function.'}}, status: :unauthorized
  end

  def page
    params[:page].present? ? params[:page].to_i : nil
  end

end
