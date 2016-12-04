require 'test_helper'

class WeekSummariesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @user = User.where(email: 'admin@gmail.com').first
    jwt = Knock::AuthToken.new(payload: { sub: @user.id }).token
    @headers = {'Authorization': 'Bearer ' + jwt.to_s}
  end

  test "rest api ajax - index" do
    get '/week_summaries.json', headers: @headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json.size == 1
    assert json[0]["time"] == TimeEntry.where(user_id: @user.id).map{|t| t.time.to_i }.sum
  end

end
