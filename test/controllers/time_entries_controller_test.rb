require 'test_helper'

class TimeEntriesControllerTest < ActionDispatch::IntegrationTest

  setup do
    admin = User.where(role: "admin").first
    @time_entry = TimeEntry.where(date: '2016-11-22').first
    @time_entry.user = admin
    @time_entry.save
    jwt = Knock::AuthToken.new(payload: { sub: admin.id }).token
    @headers = {'Authorization': 'Bearer ' + jwt.to_s}
  end

  test "rest api ajax - show" do
    get '/time_entries/' + @time_entry.id.to_s + '.json', headers: @headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json["id"] == @time_entry.id
    assert json["time"] == @time_entry.time
    assert json["distance"] == @time_entry.distance
  end

  test "rest api ajax - index" do
    get '/time_entries.json', headers: @headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json.size == TimeEntry.all.size
  end

  test "rest api ajax - create" do
    newTimeEntry = {time_entry: {date: '2014-01-01', time: 999, distance: 888}}
    post '/time_entries.json', params: newTimeEntry, headers: @headers
    assert_response :created

    json = ActiveSupport::JSON.decode response.body
    assert json["date"] == "2014-01-01"
    assert json.key?("id")
  end

  test "rest api ajax - update" do
    id = @time_entry.id
    update = {time_entry: {distance: 77}}
    put '/time_entries/' + id.to_s + '.json', params: update, headers: @headers
    assert_response :success

    assert TimeEntry.find(id).present?
    assert TimeEntry.find(id).distance == 77
  end

  test "rest api ajax - delete" do
    id = @time_entry.id
    delete '/time_entries/' + id.to_s + '.json', headers: @headers
    assert_response :success

    assert TimeEntry.where(id: id).count == 0
  end

end
