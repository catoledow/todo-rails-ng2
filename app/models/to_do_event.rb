class ToDoEvent < ActiveRecord::Base
    validates :type, :details, presence: true
    self.inheritance_column = :_type_disabled
end
