require 'test_helper'

class UserTokensControllerTest < ActionDispatch::IntegrationTest
  test "successful token" do
    body = { auth: { email: 'admin@gmail.com', password: 'password123' } }
    post '/user_tokens.json', params: body
    assert_response :success
    json = ActiveSupport::JSON.decode response.body
    assert json.key? 'jwt'
  end

  test "invalid user no token" do
    body = { auth: { email: 'nobody@gmail.com', password: 'password123' } }
    post '/user_tokens.json', params: body
    assert_response :not_found
  end

  test "invalid pass no token" do
    body = { auth: { email: 'admin@gmail.com', password: 'password12_' } }
    post '/user_tokens.json', params: body
    assert_response :not_found
  end

  test "invalid weird request no token" do
    body = { auth: 'ok' }
    post '/user_tokens.json', params: body
    assert_response :not_found
  end

  test "token includes role info" do
    body = { auth: { email: 'admin@gmail.com', password: 'password123' } }
    post '/user_tokens.json', params: body
    assert_response :success
    json = ActiveSupport::JSON.decode response.body
    assert json.key? 'role'
    assert json["role"] == "admin"
  end
end
