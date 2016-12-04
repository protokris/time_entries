class TimeEntry < ApplicationRecord
  belongs_to :user
  validates_presence_of :date, :time, :distance, :user
  validates_numericality_of :time, :distance

  attr_accessor :avg_speed

  # Synthesize an average speed column
  def avg_speed
    (distance.to_f / time.to_f).round(2)
  end

  def as_json(options = { })
    super((options || { }).merge({ :methods => [:avg_speed] }))
  end

  def self.findByDateRange(fromDate, toDate, user)
    time_entries = user.present? ? TimeEntry.where(user_id: user.id) : TimeEntry.all
    time_entries = time_entries.where("date >= ?", fromDate) if fromDate.present?
    time_entries = time_entries.where("date <= ?", toDate) if toDate.present?
    time_entries.order(date: :desc)
  end

  def self.day_summaries(fromDate, toDate, current_user)
    query = <<-SQL
       '' || EXTRACT(YEAR FROM date) || EXTRACT(DOY FROM date) AS id,
       '' || EXTRACT(YEAR FROM date) || EXTRACT(DOY FROM date) AS group_id,
       MIN(date) AS date,
       SUM(time) AS time,
       SUM(distance) AS distance,
       COUNT(*) as count
    SQL
    time_entries = TimeEntry.select(query).where("user_id = ?", current_user.id).group("group_id").order("group_id DESC")
    time_entries = time_entries.where("date >= ?", fromDate) if fromDate.present?
    time_entries = time_entries.where("date <= ?", toDate) if toDate.present?
    time_entries
  end

  def self.week_summaries(current_user)
    # Use some SQL here to generate this one time report
    query = <<-SQL
       '' || EXTRACT(YEAR FROM date) || EXTRACT(WEEK FROM date) AS id,
       '' || EXTRACT(YEAR FROM date) || EXTRACT(WEEK FROM date) AS group_id,
       MIN(date) AS date,
       SUM(time) AS time,
       SUM(distance) AS distance,
       COUNT(*) as count
    SQL
    TimeEntry.select(query).where("user_id = ?", current_user.id).group("group_id").order("group_id DESC")
  end

end
