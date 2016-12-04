require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  setup do
    @user = User.where(email: 'admin@gmail.com').first
    jwt = Knock::AuthToken.new(payload: { sub: @user.id }).token
    @headers = {'Authorization': 'Bearer ' + jwt.to_s}
  end

  test "rest api ajax - show" do
    get '/users/' + @user.id.to_s + '.json', headers: @headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json["id"] == @user.id
    assert json["email"] == @user.email
    assert json["role"] == @user.role
    assert !json.key?("password")
    assert !json.key?("password_digest")
  end

  test "rest api ajax - index" do
    get '/users.json', headers: @headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json.size == User.all.size
  end

  test "rest api ajax - create" do
    newUser = {user: {email: 'new_dude@hotmail.co.uk', password: 'password123'}}
    post '/users.json', params: newUser, headers: @headers
    assert_response :created

    json = ActiveSupport::JSON.decode response.body
    assert json["role"] == "user"
    assert json.key?("id")
  end

  test "rest api ajax - update" do
    id = @user.id
    update = {user: {email: 'updated@hotmail.nz'}}
    put '/users/' + id.to_s + '.json', params: update, headers: @headers
    assert_response :success

    assert User.find(id).present?
    assert User.find(id).email == 'updated@hotmail.nz'
  end

  test "rest api ajax - delete" do
    id = @user.id
    delete '/users/' + id.to_s + '.json', headers: @headers
    assert_response :success

    assert User.where(id: id).count == 0
  end

end
