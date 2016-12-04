class AddWeekToTimeEntry < ActiveRecord::Migration[5.0]
  def change
    add_column :time_entries, :week, :integer
  end
end
