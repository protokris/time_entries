require 'test_helper'

class DaySummariesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @user = User.where(email: 'admin@gmail.com').first
    jwt = Knock::AuthToken.new(payload: { sub: @user.id }).token
    @headers = {'Authorization': 'Bearer ' + jwt.to_s}
  end

  test "rest api ajax - index" do
    get '/day_summaries.json', headers: @headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json.size == TimeEntry.where(user_id: @user.id).select("distinct date").count
  end

end
