require 'test_helper'

class UsersControllerPoliciesTest < ActionDispatch::IntegrationTest

  setup do
    @manager = User.find_by(email: 'manager@gmail.com')
    manager_token = Knock::AuthToken.new(payload: { sub: @manager.id }).token
    @manager_headers = {'Authorization': 'Bearer ' + manager_token.to_s}

    @user = User.find_by(email: 'userguy@gmail.com')
    user_token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    @user_headers = {'Authorization': 'Bearer ' + user_token.to_s}
  end


  test "manager can get users" do
    get '/users.json', headers: @manager_headers
    assert_response :success

    json = ActiveSupport::JSON.decode response.body
    assert json.size == User.all.size
  end

  test "manager can add users" do
    newUser = {user: {email: 'new_dude@hotmail.co.uk', password: 'password123'}}
    post '/users.json', params: newUser, headers: @manager_headers
    assert_response :created
  end

  test "manager can update users" do
    id = @user.id
    update = {user: {email: 'updated@hotmail.nz'}}
    put '/users/' + id.to_s + '.json', params: update, headers: @manager_headers
    assert_response :success
  end

  test "manager can delete users" do
    id = @user.id
    delete '/users/' + id.to_s + '.json', headers: @manager_headers
    assert_response :success
  end

  test "user can't get users" do
    get '/users.json', headers: @user_headers
    assert_response :unauthorized
  end

  test "user CAN add (register) users - everyone can" do
    newUser = {user: {email: 'new_dude2@hotmail.co.uk', password: 'password123'}}
    post '/users.json', params: newUser, headers: @user_headers
    assert_response :success
  end

  test "user can't update users" do
    id = @manager.id
    update = {user: {email: 'updated@hotmail.nz'}}
    put '/users/' + id.to_s + '.json', params: update, headers: @user_headers
    assert_response :unauthorized
  end

  test "user can't delete users" do
    id = @manager.id
    delete '/users/' + id.to_s + '.json', headers: @user_headers
    assert_response :unauthorized
  end

end
