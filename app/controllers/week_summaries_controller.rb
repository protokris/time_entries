class WeekSummariesController < ApplicationController

  def index
    @week_summaries = TimeEntry.week_summaries(current_user)
    @week_summaries = @week_summaries.page(page) if page.present?
  end

end
