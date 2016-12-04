class DaySummariesController < ApplicationController

  def index
    fromDate = params[:fromDate].present? ? Date.parse(params[:fromDate]) : nil
    toDate = params[:toDate].present? ? Date.parse(params[:toDate]) : nil
    @day_summaries = TimeEntry.day_summaries(fromDate, toDate, current_user)
    @day_summaries = @day_summaries.page(page) if page.present?
  end

end
