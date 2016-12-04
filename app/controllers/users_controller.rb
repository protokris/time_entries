class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:new, :create]

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    authorize User, :user_list?
    @users = User.all
    @users = @users.page(page) if page.present?
  end

  def show
    @user =  User.find(params[:id])
    authorize @user
    @user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :show, status: :created, location: @user
    else
      render json: {errors: @user.errors}, status: :unprocessable_entity
    end
  end

 def update
    @user =  User.find(params[:id])
    authorize @user
    if @user.update(user_params)
      render :show, status: :ok, location: @user
    else
      render json: {errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @user =  User.find(params[:id])
    authorize @user
    @user.destroy
    head :no_content
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:email, :password, :role)
  end

end
