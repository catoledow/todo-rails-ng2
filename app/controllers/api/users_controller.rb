class Api::UsersController < ApplicationController
    before_action :generate_authentication_token!, only: [:update, :destroy]
    respond_to :json

    def create
        user = User.new(user_params)

        if user.save
            render json: { user: user }, status: 201, location: [:api, user]
        else
            render json: { errors: user.errors }, status: 422
        end
    end

    private

        def user_params
            params.require(:user).permit(:name, :email, :password)
        end
end
