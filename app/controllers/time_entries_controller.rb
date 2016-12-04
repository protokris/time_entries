class TimeEntriesController < ApplicationController

  before_action :authorize_for_other_user, only: [:index, :create, :update]

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    fromDate = params[:fromDate].present? ? Date.parse(params[:fromDate]) : nil
    toDate = params[:toDate].present? ? Date.parse(params[:toDate]) : nil
    @time_entries = TimeEntry.findByDateRange(fromDate, toDate, user_from_params)
    @time_entries = @time_entries.page(page) if page.present?
  end

  def show
    @time_entry = TimeEntry.find(params[:id])
    authorize @time_entry
  end

  def new
    @time_entry = TimeEntry.new
  end

  def create
    @time_entry = TimeEntry.new(time_entry_params)
    authorize @time_entry
    if @time_entry.save
      render :show, status: :created, location: @time_entry
    else
      render json: {errors: @time_entry.errors}, status: :unprocessable_entity
    end
  end

 def update
    @time_entry = TimeEntry.find(params[:id])
    authorize @time_entry
    if @time_entry.update(time_entry_params)
      render :show, status: :ok, location: @time_entry
    else
      render json: {errors: @time_entry.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @time_entry = TimeEntry.find(params[:id])
    authorize @time_entry
    @time_entry.destroy
    head :no_content
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def time_entry_params
    user = user_from_params || current_user
    params.require(:time_entry).permit(:date, :time, :distance, :email).merge(user_id: user.id)
  end

  def user_from_params
    if current_user.admin?
      return User.find(params[:user_id]) if params[:user_id].present?
      return User.find_by(email: params[:email]) if params[:email].present?
      return nil
    end
    current_user
  end

  def authorize_for_other_user
    if (params[:user_id].present? || params[:email].present?) && !current_user.admin?
      render json: {errors: {user_id: 'not authorized access id.'}}, status: :unauthorized
    end
  end

end
