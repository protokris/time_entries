require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "invalid without email" do
    user = User.new(password: 'password123')
    refute user.valid?, 'user is invalid without email'
  end

  test "invalid without valid email" do
    user = User.new(email: 'nachos', password: 'password123')
    refute user.valid?, 'user is invalid without valid email'
  end

end
