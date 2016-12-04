class UserTokensController < Knock::AuthTokenController

    rescue_from NoMethodError, with: :not_found

    def create
      render json: json_auth, status: :created
    end

    private

    def json_auth
      auth_token = Knock::AuthToken.new(payload: { sub: entity.id })
      {jwt: auth_token.token, role: entity.role}.to_json
    end

    def entity_name
      'User'
    end

end
