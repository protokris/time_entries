require 'test_helper'

class TimeEntriesControllerPoliciesTest < ActionDispatch::IntegrationTest
#  tests TimeEntriesController

  setup do
    @time_entry = TimeEntry.where(date: '2016-11-30').first

    @admin = User.find_by(email: 'admin@gmail.com')
    admin_token = Knock::AuthToken.new(payload: { sub: @admin.id }).token
    @admin_headers = {'Authorization': 'Bearer ' + admin_token.to_s, 'Content-Type': 'application/json'}

    @manager = User.find_by(email: 'manager@gmail.com')
    manager_token = Knock::AuthToken.new(payload: { sub: @manager.id }).token
    @manager_headers = {'Authorization': 'Bearer ' + manager_token.to_s, 'Content-Type': 'application/json'}

    @user = User.find_by(email: 'userguy@gmail.com')
    user_token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    @user_headers = {'Authorization': 'Bearer ' + user_token.to_s, 'Content-Type': 'application/json'}

  end

  test "admin can get others entries" do
    get '/time_entries.json?user_id=' + @user.id.to_s, headers: @admin_headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json.size == TimeEntry.where(user_id: @user.id).size
  end

  test "admin can create entry for other" do
    data = {email: @user.email, time_entry: {date: '2014-01-01', time: 999, distance: 888} }
    post '/time_entries.json', params: data.to_json.to_s, headers: @admin_headers
    assert_response :created

    json = ActiveSupport::JSON.decode response.body
    assert json["owner_id"] == @user.id
  end

  test "admin can update entry for other" do
    id = @time_entry.id
    assert @time_entry.user_id == @user.id
    assert @time_entry.distance != 77

    update = {time_entry: {distance: 77}}
    put '/time_entries/' + id.to_s + '.json', params: update.to_json.to_s, headers: @admin_headers
    assert_response :success
    @time_entry = TimeEntry.find(id)
    assert @time_entry.distance == 77
  end

  test "admin can delete entry for other" do
    id = @time_entry.id
    assert @time_entry.user_id == @user.id

    delete '/time_entries/' + id.to_s + '.json', headers: @admin_headers
    assert_response :success
  end

  test "manager or user can't get others entries" do
    get '/time_entries.json?user_id=' + @user.id.to_s, headers: @manager_headers
    assert_response :unauthorized

    get '/time_entries.json?user_id=' + @user.id.to_s, headers: @user_headers
    assert_response :unauthorized
  end

  test "manager or user can't create entry for other" do
    anon = User.find_by(email: 'anon@gmail.com')
    data = {email: anon.email, time_entry: {date: '2014-01-01', time: 999, distance: 888} }
    post '/time_entries.json', params: data.to_json.to_s, headers: @manager_headers
    assert_response :unauthorized

    post '/time_entries.json', params: data.to_json.to_s, headers: @user_headers
    assert_response :unauthorized
  end

  test "manager or user can't update entry for other" do
    anon = User.find_by(email: 'anon@gmail.com')
    time_entry = TimeEntry.where(user_id: anon.id).first
    id = time_entry.id
    assert time_entry.distance != 77

    update = {time_entry: {distance: 77}}
    put '/time_entries/' + id.to_s + '.json', params: update.to_json.to_s, headers: @user_headers
    assert_response :unauthorized

    put '/time_entries/' + id.to_s + '.json', params: update.to_json.to_s, headers: @manager_headers
    assert_response :unauthorized
  end

  test "manager or user can't delete entry for other" do
    time_entry = TimeEntry.where(date: '2016-01-01').first
    anon = User.find_by(email: 'anon@gmail.com')
    assert time_entry.user_id == anon.id

    delete '/time_entries/' + time_entry.id.to_s + '.json', headers: @manager_headers
    assert_response :unauthorized

    delete '/time_entries/' + time_entry.id.to_s + '.json', headers: @user_headers
    assert_response :unauthorized
  end

end
