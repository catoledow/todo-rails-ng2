class Task < ActiveRecord::Base
    belongs_to :user

    validates :content, :user_id, presence: true
end
