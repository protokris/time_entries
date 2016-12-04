require 'test_helper'

class TimeEntryTest < ActiveSupport::TestCase

    test "average speed" do
      assert User.all.first.id
      te = TimeEntry.new(date: (Date.today), time: 10, distance: 200, user_id: User.all.first.id)
      assert_equal 20, te.avg_speed, 'average speed miscalculated'
    end

    test "invalid without date" do
      assert User.all.first.id
      te = TimeEntry.new(time: rand(100..5000), distance: rand(100..500), user_id: User.all.first.id)
      refute te.valid?, 'time entry is invalid without date'
    end

    test "invalid without time" do
      assert User.all.first.id
      te = TimeEntry.new(date: (Date.today), distance: rand(100..500), user_id: User.all.first.id)
      refute te.valid?, 'time entry is invalid without time'
    end

    test "invalid without distance" do
      assert User.all.first.id
      te = TimeEntry.new(date: (Date.today), time: rand(100..5000), user_id: User.all.first.id)
      refute te.valid?, 'time entry is invalid without distance'
    end

    test "invalid without numerical distance" do
      assert User.all.first.id
      te = TimeEntry.new(date: (Date.today), time: rand(100..5000), distance: "Foo", user_id: User.all.first.id)
      refute te.valid?, 'time entry is invalid without distance'
    end

    test "invalid without numerical time" do
      assert User.all.first.id
      te = TimeEntry.new(date: (Date.today), time: "dog", distance: 9, user_id: User.all.first.id)
      refute te.valid?, 'time entry is invalid without time'
    end


end
