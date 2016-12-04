json.extract! time_entry, :id, :date, :time, :distance, :avg_speed
json.url time_entry_url(time_entry, format: :json)
json.owner_email time_entry.user.email
json.owner_id time_entry.user.id
