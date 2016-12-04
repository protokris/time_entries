class CreateTimeEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :time_entries do |t|
      t.date :date
      t.integer :time
      t.integer :distance

      t.timestamps
    end
  end
end
