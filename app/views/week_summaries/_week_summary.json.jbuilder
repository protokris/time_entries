json.extract! week_summary, :id, :date, :time, :distance
json.avg_speed (week_summary.distance.to_f / week_summary.time.to_f).round(2)
