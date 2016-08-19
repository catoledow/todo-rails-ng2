class User < ActiveRecord::Base
    validates :auth_token, uniqueness: true
    before_create :generate_authentication_token!

    has_many :tasks, dependent: :destroy

    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

    def generate_authentication_token!
        begin
            self.auth_token = Devise.friendly_token
        end while self.class.exists?(auth_token: auth_token)
    end


    def update
        user = current_user

        if user.update(user_params)
            render json: user, status: 200, location: [:api, user]
        else
            render json: { errors: user.errors }, status: 422
        end
    end
end
