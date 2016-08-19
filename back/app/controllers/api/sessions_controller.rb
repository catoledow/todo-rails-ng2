class Api::SessionsController < ApplicationController

    def create

        if params.has_key?(:session)

            user_password = params[:session][:password]
            user_email = params[:session][:email]
            user = user_email.present? && User.find_by(email: user_email)

            if user and user.valid_password? user_password
                sign_in user, store: false
                user.generate_authentication_token!
                user.save
                render json: { user: user, tasks: user.tasks}, status: 200, location: [:api, user]
            else
                render json: { errors: "Email e senha inválidos" }, status: 422
            end
        else
            render json: { errors: "Requisição inválida" }, status: 400
        end
    end
end
